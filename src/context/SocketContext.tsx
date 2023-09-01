import { ReactNode, useEffect } from "react";
import { createContext } from "react";

// import { AuthContext } from "../auth/AuthContext";
// import { ChatContext } from "./chat/ChatContext";
// import { useSocket } from "../hooks/useSocket";

import { useSockets } from "@/hooks";
import { BASE_URL } from "@/config";
import { SOCKETS_EVENTS } from "@/constants";
import { Socket } from "socket.io-client";

interface ContextProps {
  socket: Socket | undefined;
  online: boolean | undefined;
}

export const SocketContext = createContext<ContextProps | null>(null);

interface Props {
  children: ReactNode;
}
export const SocketProvider = ({ children }: Props) => {
  const { socket, online, conectarSocket, desconectarSocket } =
    useSockets(BASE_URL);
  // const { auth } = useContext(AuthContext);
  // const { dispatch } = useContext(ChatContext);

  // useEffect(() => {
  //   if (auth.logged) {
  //     conectarSocket();
  //   }
  // }, [auth, conectarSocket]);

  // useEffect(() => {
  //   if (!auth.logged) {
  //     desconectarSocket();
  //   }
  // }, [auth, desconectarSocket]);

  // Escuchar los cambios en los usuarios conectados
  useEffect(() => {
    socket?.on(SOCKETS_EVENTS.MENUS_LIST, (usuarios) => {
      console.log("TCL: SocketProvider -> usuarios", usuarios);
      // dispatch({
      //   type: types.usuariosCargados,
      //   payload: usuarios,
      // });
    });
  }, [socket]);

  // useEffect(() => {
  //   socket?.on("mensaje-personal", (mensaje) => {
  //     dispatch({
  //       type: types.nuevoMensaje,
  //       payload: mensaje,
  //     });

  //   });
  // }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
