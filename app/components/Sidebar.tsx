'use client'
import { useState } from 'react';
import Link from 'next/link'
import { IoLogoWechat } from "react-icons/io5";
import { IoCalendarNumber } from "react-icons/io5";
import { FaStickyNote } from "react-icons/fa";
import { RiFileUploadFill } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

export default function Sidebar() {
    const sidebarLinks = [
        {
            title: "Agendamento",
            icon: IoCalendarNumber,
            href: "/scheduling"
        },
        {
            title: "Anotações",
            icon: FaStickyNote,
            href: "/notes"
        },
        {
            title: "Arquivos",
            icon: RiFileUploadFill,
            href: "/files"
        }
    ];

    // Estado para controlar as salas e o estado do dropdown
    const [rooms, setRooms] = useState(["Sala 1", "Sala 2"]); // Lista de salas (adicionar lógica para pegar do backend)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [newRoomName, setNewRoomName] = useState(''); // Nome da nova sala
    const [showInput, setShowInput] = useState(false)

    // Função para alternar o estado do dropdown
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // Função para criar uma nova sala
    const createRoom = () => {
        setShowInput(!showInput)
        if (newRoomName.trim()) {
            setRooms([...rooms, newRoomName]);
            setNewRoomName(''); // Limpa o campo de input após a criação da sala
        }
    };

    const deleteItem = (name: string) => {
        let newRooms = rooms.filter(item => item !== name);
        setRooms(newRooms);
    }
    

    return (
        <aside className='bg-slate-50 flex flex-col w-12 hover:w-1/5 h-screen space-y-2 text-slate-900 transition-all group'>
            <div className='flex justify-between items-center p-2 bg-[#33adff]'>
                <span className='text-white opacity-0 group-hover:opacity-100 font-bold'>Grupo de estudos</span>
            </div>

            <div className='border-b-2 pl-2 opacity-0 group-hover:opacity-100'>
                <h1 className='text-xl font-bold'>Camila Madureira</h1>
                <div className='flex items-center space-x-2'>
                    <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                    <span className='text-sm'>online</span>
                </div>
            </div>

            <div className='flex-grow space-y-3'>
                {sidebarLinks.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={i}
                            href={item.href}
                            className='flex justify-center group-hover:justify-start pl-2 group-hover:p-2 space-x-3 hover:bg-[#ccebff] transition-colors'
                        >
                            <Icon className='w-6 h-6 text-[#33adff]' />
                            <span className='opacity-0 group-hover:opacity-100  transition-opacity duration-200 w-0 group-hover:w-auto'>
                                {item.title}
                            </span>
                        </Link>
                    );
                })}
            </div>

          
            <div className='pl-2'>
                <div
                    onClick={toggleDropdown}
                    className='flex justify-between items-center cursor-pointer hover:bg-[#ccebff] p-2 transition-colors'
                >
                    <span className='text-sm font-medium opacity-0 group-hover:opacity-100'>Salas</span>
                    <IoLogoWechat className='w-6 h-6 text-[#33adff] group-hover:justify-start' />
                </div>

                {dropdownOpen && (
                    <div className='space-y-2 pl-4'>
                       
                        {rooms.length > 0 ? (
                            rooms.map((room, index) => (
                                <div key={index} className='flex items-center justify-between text-sm py-1 px-2 hover:bg-[#ccebff]'>
                                    {room}
                                    <IoClose className="cursor-pointer" onClick={() => deleteItem(room)} />

                                </div>
                            ))
                        ) : (
                            <div className='text-sm py-1 px-2 text-gray-500'>Sem salas criadas</div>
                        )}

                        
                        <div className='space-y-1'>
                            {
                                showInput && (
                                    <input
                                    type="text"
                                    placeholder="Digite o nome da sala"
                                    value={newRoomName}
                                    onChange={(e) => setNewRoomName(e.target.value)}
                                    className='w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33adff]'
                                    />
                                )
                            }
                          
                            <button
                                onClick={createRoom}
                                className='w-full text-white bg-[#33adff] p-2 rounded-md text-sm'
                            >
                                Criar nova sala
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <footer className='bg-[#33adff] h-10 flex items-center justify-center group-hover:justify-end p-2'>
                <RiLogoutCircleRLine className='w-6 h-6 text-white' />
            </footer>
        </aside>
    );
}
