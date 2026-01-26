'use client'

import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";

export default function ManagerChatPage() {
	const [selectedChat, setSelectedChat] = useState<number>(1);
	const [messageInput, setMessageInput] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	// Mock data - replace with real API calls
	const conversations = [
		{
			id: 1,
			name: "Ahmad Fauzi",
			avatar: "👨",
			lastMessage: "Terima kasih atas informasinya",
			timestamp: "10:30",
			unread: 0,
			type: "tenant",
			property: "Kos Ganesha Premium",
			room: "101",
			online: true,
		},
		{
			id: 2,
			name: "Budi Santoso",
			avatar: "👨‍💼",
			lastMessage: "Kapan bisa lihat kamarnya?",
			timestamp: "09:15",
			unread: 2,
			type: "prospect",
			property: "Kos Dago Residence",
			room: null,
			online: false,
		},
		{
			id: 3,
			name: "Citra Dewi",
			avatar: "👩",
			lastMessage: "AC di kamar saya rusak",
			timestamp: "Kemarin",
			unread: 1,
			type: "tenant",
			property: "Kos Sukajadi Indah",
			room: "203",
			online: false,
		},
		{
			id: 4,
			name: "Dian Pratama",
			avatar: "👨‍🦱",
			lastMessage: "Baik, saya akan transfer hari ini",
			timestamp: "Kemarin",
			unread: 0,
			type: "tenant",
			property: "Kos Setiabudi Elite",
			room: "304",
			online: true,
		},
		{
			id: 5,
			name: "Eka Putri",
			avatar: "👩‍🦰",
			lastMessage: "Apakah masih ada kamar kosong?",
			timestamp: "2 hari lalu",
			unread: 0,
			type: "prospect",
			property: "Kos Dipatiukur",
			room: null,
			online: false,
		},
	];

	const messages = [
		{
			id: 1,
			senderId: 1,
			senderName: "Ahmad Fauzi",
			content: "Selamat pagi Pak, saya mau tanya tentang pembayaran bulan depan",
			timestamp: "10:25",
			isOwn: false,
		},
		{
			id: 2,
			senderId: "manager",
			senderName: "Anda",
			content: "Selamat pagi. Silakan, ada yang bisa saya bantu?",
			timestamp: "10:26",
			isOwn: true,
		},
		{
			id: 3,
			senderId: 1,
			senderName: "Ahmad Fauzi",
			content: "Apakah bisa dibayar tanggal 5 nanti? Karena gaji saya cair tanggal 5",
			timestamp: "10:27",
			isOwn: false,
		},
		{
			id: 4,
			senderId: "manager",
			senderName: "Anda",
			content: "Baik, tidak masalah. Tapi tolong konfirmasi lagi ya sebelum tanggal 5",
			timestamp: "10:28",
			isOwn: true,
		},
		{
			id: 5,
			senderId: 1,
			senderName: "Ahmad Fauzi",
			content: "Terima kasih atas informasinya",
			timestamp: "10:30",
			isOwn: false,
		},
	];

	const currentConversation = conversations.find(c => c.id === selectedChat);

	const filteredConversations = conversations.filter(conv =>
		conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		conv.property.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleSendMessage = () => {
		if (messageInput.trim()) {
			// In real app, send message via API
			console.log("Sending message:", messageInput);
			setMessageInput("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="h-full flex flex-col bg-gray-50">
			<div className="flex-1 flex overflow-hidden">
				{/* Conversations List - Sidebar */}
				<div className={`w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col ${selectedChat ? 'hidden lg:flex' : 'flex'}`}>
					{/* Search */}
					<div className="p-4 border-b border-gray-200">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Cari percakapan..."
								className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
							/>
						</div>
					</div>

					{/* Conversation List */}
					<div className="flex-1 overflow-y-auto">
						{filteredConversations.map((conv) => (
							<div
								key={conv.id}
								onClick={() => setSelectedChat(conv.id)}
								className={`p-4 border-b border-gray-100 cursor-pointer transition hover:bg-gray-50 ${selectedChat === conv.id ? 'bg-blue-50' : ''
									}`}
							>
								<div className="flex gap-3">
									{/* Avatar */}
									<div className="relative shrink-0">
										<div className="w-12 h-12 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl">
											{conv.avatar}
										</div>
										{conv.online && (
											<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
										)}
									</div>

									{/* Info */}
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between mb-1">
											<div className="flex-1 min-w-0">
												<h4 className="font-semibold text-gray-900 text-sm truncate">{conv.name}</h4>
												<p className="text-xs text-gray-500 truncate">
													{conv.property} {conv.room && `• ${conv.room}`}
												</p>
											</div>
											<span className="text-xs text-gray-500 ml-2">{conv.timestamp}</span>
										</div>
										<div className="flex items-center justify-between">
											<p className="text-sm text-gray-600 truncate flex-1">{conv.lastMessage}</p>
											{conv.unread > 0 && (
												<span className="ml-2 px-2 py-0.5 bg-golden-yellow text-white text-xs font-bold rounded-full">
													{conv.unread}
												</span>
											)}
										</div>
										<div className="mt-1">
											<span className={`text-xs px-2 py-0.5 rounded-full ${conv.type === 'tenant'
													? 'bg-green-100 text-green-700'
													: 'bg-blue-100 text-blue-700'
												}`}>
												{conv.type === 'tenant' ? 'Penyewa' : 'Calon Penyewa'}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Chat Area */}
				<div className={`flex-1 flex flex-col ${selectedChat ? 'flex' : 'hidden lg:flex'}`}>
					{currentConversation ? (
						<>
							{/* Chat Header */}
							<div className="bg-white border-b border-gray-200 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<button
											onClick={() => setSelectedChat(0)}
											className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
										>
											←
										</button>
										<div className="relative">
											<div className="w-10 h-10 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl">
												{currentConversation.avatar}
											</div>
											{currentConversation.online && (
												<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
											)}
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">{currentConversation.name}</h3>
											<p className="text-xs text-gray-500">
												{currentConversation.property} {currentConversation.room && `• ${currentConversation.room}`}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<button className="p-2 hover:bg-gray-100 rounded-lg transition">
											<Phone size={20} className="text-gray-600" />
										</button>
										<button className="p-2 hover:bg-gray-100 rounded-lg transition">
											<Video size={20} className="text-gray-600" />
										</button>
										<button className="p-2 hover:bg-gray-100 rounded-lg transition">
											<MoreVertical size={20} className="text-gray-600" />
										</button>
									</div>
								</div>
							</div>

							{/* Messages */}
							<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
									>
										<div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
											<div
												className={`rounded-2xl px-4 py-2 ${message.isOwn
														? 'bg-gray-900 text-white'
														: 'bg-white text-gray-900'
													}`}
											>
												<p className="text-sm">{message.content}</p>
											</div>
											<p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
												{message.timestamp}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Message Input */}
							<div className="bg-white border-t border-gray-200 p-4">
								<div className="flex items-end gap-2">
									<button className="p-2 hover:bg-gray-100 rounded-lg transition">
										<Paperclip size={20} className="text-gray-600" />
									</button>
									<div className="flex-1">
										<textarea
											value={messageInput}
											onChange={(e) => setMessageInput(e.target.value)}
											onKeyPress={handleKeyPress}
											placeholder="Ketik pesan..."
											rows={1}
											className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm resize-none"
										/>
									</div>
									<button
										onClick={handleSendMessage}
										disabled={!messageInput.trim()}
										className="p-3 bg-golden-yellow text-white rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Send size={20} />
									</button>
								</div>
							</div>
						</>
					) : (
						<div className="flex-1 flex items-center justify-center bg-gray-50">
							<div className="text-center">
								<div className="text-6xl mb-4">💬</div>
								<h3 className="text-lg font-bold text-gray-900 mb-2">Pilih Percakapan</h3>
								<p className="text-sm text-gray-500">
									Pilih percakapan dari daftar untuk mulai chat
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
