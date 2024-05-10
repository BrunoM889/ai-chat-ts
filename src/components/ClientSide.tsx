"use client";
import React, { useState } from "react";
import "@/app/globals.css";
import PopUpError from "./PopUpError";
import Mensaje from "./Mensaje";
import Form from "./Form";

export type Mensaje = {
  autor: string;
  msj: string[];
};

function ClientSide(): JSX.Element {
  const [error, setError] = useState<null | string>(null);

  const [chat, setChat] = useState<Mensaje[]>([{ autor: "AI", msj: ["What can i do for you today?"] }]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center clas1">
      {error && <PopUpError msj={error} />}
      <div className=" flex flex-col justify-center w-[90vw] max-w-[900px] h-[90vh] min-h-[700px]">
        <div className="w-full clas h-[80%] overflow-auto mb-4 rounded" id="scroll-container">
          {chat.map((x, id) => {
            return <Mensaje mensaje={x} key={id} />;
          })}
        </div>
        <Form setChat={setChat} setError={setError} chat={chat} />
      </div>
    </div>
  );
}

export default ClientSide;
