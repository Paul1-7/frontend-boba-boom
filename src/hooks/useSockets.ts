import { useState, useEffect, useCallback } from 'react'
import { Socket, io } from 'socket.io-client'

function useSockets(serverPath: string) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined)
  const [online, setOnline] = useState<boolean | undefined>(false)

  const conectarSocket = useEffect(() => {
    // const token = localStorage.getItem("token");

    const socketTemp = io(serverPath)
    setSocket(socketTemp)
  }, [serverPath])

  const desconectarSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  useEffect(() => {
    setOnline(socket?.connected)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setOnline(true))
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false))
  }, [socket])

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket
  }
}

export default useSockets
