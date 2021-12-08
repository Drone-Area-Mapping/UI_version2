#undef UNICODE

#define WIN32_LEAN_AND_MEAN

#include <WinSock2.h>
#include <WS2tcpip.h>
#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <thread>
#include <atomic>
#include "json.hpp"

#pragma comment (lib, "Ws2_32.lib")

#define DEFAULT_PORT 1337
#define DEFAULT_IP "127.0.0.1"

using namespace std;
using json = nlohmann::json;

SOCKET ConnectSocket;

atomic<bool> exitProgram(false);

void decode(string input)
{
	// parse and serialize JSON
	json j_complete = json::parse(input);

	if (j_complete["name"] == "startProcessing") {
		cout << "Name: " << j_complete["name"] << "\n";
		cout << "Export: " << j_complete["value"]["export"] << "\n";
		cout << "Import: " << j_complete["value"]["import"] << "\n";
	}
	else 
		cout << j_complete["name"] << " with value: " << j_complete["value"] << "\n";
	
}

void sendjson(string header, int intValue, bool boolValue, string strValue)
{

}

string read_line(SOCKET socket)
{
	vector<char> vector;
	char buffer;
	int bytes_received;

	while (true) {
		bytes_received = recv(socket, &buffer, 1, 0);

		if (bytes_received <= 0) return "";
		if (buffer == '\n') {
			vector.push_back(buffer);
			char* pchar = new char[vector.size() + 1];
			memset(pchar, 0, vector.size() + 1);
			for (int f = 0; f < vector.size(); ++f)
				pchar[f] = vector[f];

			return pchar;
		}
		else
			vector.push_back(buffer);
	}
}

void getinput()
{
	string inputLine;

	while (true)
	{
		inputLine = read_line(ConnectSocket);
		if (inputLine != "") {
			printf(inputLine.c_str());
			decode(inputLine);
		}
		else break;
	}

	printf("[Input]: Connection terminated!\n");

	exitProgram = true;
}

void getoutput()
{
	string str;

	do
	{
		getline(cin, str);
		send(ConnectSocket, str.c_str(), str.length(), 0);
	} while(str.find("exit") != 0);

	printf("[Output]: Connection terminated!\n");

	exitProgram = true;
}

int main()
{
	//Initialize Winsock
	WSADATA wsaData;
	int iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
	if (iResult != NO_ERROR) {
		printf("WSAStartup Failed with error: %d\n", iResult);
		return 1;
	}

	ConnectSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (ConnectSocket == INVALID_SOCKET) {
		printf("Error at socket: %d\n", WSAGetLastError());
		WSACleanup();
		return 1;
	}

	// The sockaddr_in structure specifies the address family,
	// IP address, and port for the socket that is being bound.
	sockaddr_in addrServer;
	addrServer.sin_family = AF_INET;
	InetPton(AF_INET, DEFAULT_IP, &addrServer.sin_addr.s_addr);
	addrServer.sin_port = htons(DEFAULT_PORT);
	memset(&(addrServer.sin_zero), '\0', 8);

	// Connect to server.
	iResult = connect(ConnectSocket, (SOCKADDR*)&addrServer, sizeof(addrServer));
	if (iResult == SOCKET_ERROR) {
		closesocket(ConnectSocket);
		printf("Unable to connect to server: %d\n", WSAGetLastError());
		WSACleanup();
		return 1;
	}

	thread inputThread(getinput);
	thread outputThread(getoutput);
	
	// Wait for the threads to shutdown after losing connection
	inputThread.join();
	outputThread.detach(); // Blocking thread, using detach to terminate the thread!

	printf("[Main]: Closing connection with the server . . .");

	// cleanup
	// shutdown the connection since no more data will be sent
	iResult = shutdown(ConnectSocket, SD_BOTH);
	if (iResult == SOCKET_ERROR) {
		printf("shutdown failed with error: %d\n", WSAGetLastError());
		closesocket(ConnectSocket);
		WSACleanup();
		return 1;
	}
	closesocket(ConnectSocket);
	WSACleanup();

	exit(0);
}
