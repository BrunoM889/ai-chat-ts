import React from "react";
import "@/app/globals.css";
function Mensaje({ mensaje }: { mensaje: { autor: string; msj: string[] } }): JSX.Element {
  return (
    <div
      className={`flex w-full gap-2 mb-4 p-4 ${
        mensaje.autor == "AI"
          ? "bg-gradient-to-r from-[#3a0b3a83] to-[#15031500]"
          : ""
      } rounded `}
    >
      <div className="w-full flex flex-col charge">
        <h4 className="mb-1 font-medium flex items-center max-[500px]:text-[14px]">{mensaje.autor}</h4>
        {mensaje.msj.map((m, i) => {
          return (
            <p
              className="w-full font-normal text-[#ffebffce] max-[500px]:text-[12px] text-[16px] min-h-[24px] charge"
              key={i}
            >
              {m}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Mensaje;
