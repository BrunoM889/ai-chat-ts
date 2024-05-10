"use client";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import SendIcon from "./icons/SendIcon";
import Loader from "./Loader";
import { Mensaje } from "./ClientSide";

type Params = {
  setChat: (x: Mensaje[]) => void;
  setError: (x: string | null) => void;
  chat: Mensaje[];
};

function Form({ setChat, setError, chat }: Params): JSX.Element {
  const [prompt, setPrompt] = useState<string>("");

  const [writing, setWriting] = useState<boolean>(false);

  //To check if the wrting finish
  const [AIResponse, setAIResponse] = useState<Mensaje | null>(null);

  const scroll = (): void => {
    const toScroll: number | undefined =
      document.getElementById("scroll-container")?.scrollHeight;

    if (toScroll) {
      document.getElementById("scroll-container")?.scrollTo({
        top: toScroll,
        behavior: "smooth",
      });
    }
  };

  //Recursive function to add messages with a delay
  const addMessagesWithDelay = async (
    messagesToAdd: string[],
    count: number,
    chatToUpdate: Mensaje[]
  ) => {
    if (count < messagesToAdd.length) {
      const newChat = [...chatToUpdate];
      newChat[newChat.length - 1].msj.push(messagesToAdd[count]);
      setChat(newChat);
      if (
        messagesToAdd[count] != "" &&
        messagesToAdd[count] != " " &&
        messagesToAdd[count] != "\n"
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.round(Math.random() * 7 * 100))
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      addMessagesWithDelay(messagesToAdd, count + 1, newChat);
    }
  };

  const handleAIResponse = async (
    aiResponse: Mensaje,
    copiaDelChat: Mensaje[]
  ) => {
    const messagesToAdd = aiResponse.msj;
    await addMessagesWithDelay(messagesToAdd, 0, copiaDelChat);
  };

  const getResponse = async (clientPrompt: string) => {
    setWriting(true);
    const copiaDelChat: Mensaje[] = [...chat];
    copiaDelChat.push({ autor: "YOU", msj: clientPrompt.split("\n") });
    setChat(copiaDelChat);

    let context: string = "";

    for (const i of chat) {
      context += i.autor;
      context += "\n";
      context += i.msj;
      context += "\n";
    }

    try {
      const res = await fetch("/api/getResponse", {
        method: "POST",
        body: JSON.stringify({ clientPrompt: clientPrompt, context: context }),
        headers: {
          "Content-Type": "/aplication/json",
        },
      });

      const aiResponse: Mensaje = await res.json();

      setAIResponse(aiResponse);

      copiaDelChat.push({ autor: "AI", msj: [] });

      await handleAIResponse(aiResponse, copiaDelChat);
    } catch (error) {
      setError("Parece que hubo un error al procesar la respuesta");
      setTimeout(() => {
        setError(null);
      }, 2000);
      setWriting(false);
    }
  };

  useEffect(() => {
    scroll();
    if (AIResponse) {
      if (chat[chat.length - 1].msj.length == AIResponse.msj.length) {
        setWriting(false);
        setAIResponse(null);
      }
    }
  }, [chat]);

  return (
    <form
      className="w-full flex gap-2 items-end"
      onSubmit={(e) => {
        e.preventDefault();
        if (prompt != "") {
          getResponse(prompt);
          setPrompt("");
        }
      }}
    >
      <textarea
        className={`h-12 ${
          prompt.includes("\n") && "h-36"
        } resize-none transition-all font-extralight bg-gradient-to-tl from-[#3a0b3ac9] to-transparent bg-transparent w-full shadow-lg shadow-[#05000546] rounded-md outline-none p-3`}
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      ></textarea>
      {writing ? (
        <Loader />
      ) : (
        <button
          className={`rounded-md w-[48px] min-w-[48px] h-[48px] p-2 transition-all flex justify-center items-center bg-gradient-to-tl from-[#3a0b3ac9] to-transparent bg-transparent shadow-lg shadow-[#05000546] ${
            prompt != ""
              ? "bg-[#3a0b3ac9] cursor-pointer active:scale-95"
              : "cursor-default"
          }`}
        >
          <SendIcon />
        </button>
      )}
    </form>
  );
}

export default Form;
