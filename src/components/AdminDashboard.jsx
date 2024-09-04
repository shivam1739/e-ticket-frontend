import React, { useState, useEffect } from "react";
import API from "../api/api";
import { checkFormDataField } from "../utils/commonUtils";
import { toast } from "react-toastify";

const AdminDashboard = () => {
	const [events, setEvents] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		venue: "",
		date: "",
		description: "",
		totalTickets: "",
		ticketPrice: "",
	});

	useEffect(() => {
		const fetchEvents = async () => {
			const { data } = await API.get("/event");
			setEvents(data);
		};
		fetchEvents();
	}, []);

	const handleChange = (e) => {
		if (e.target.name === 'totalTickets' || e.target.name === 'ticketPrice') {
			setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {

			const { data } = await API.post("/event/create", formData);
			setEvents([...events, data]);

			setFormData({
				name: "",
				venue: "",
				date: "",
				description: "",
				totalTickets: "",
				ticketPrice: "",
			});
		} catch (error) {
			console.error("Error saving event", error);
		}
	};



	const handleDelete = async (id) => {
		try {
			await API.delete(`/event/${id}`);
			setEvents(events.filter((event) => event.id !== id));
		} catch (error) {
			console.error("Error deleting event", error);
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<div className="container mx-auto p-6 bg-gray-900 text-white">
			<h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

			<form onSubmit={handleSubmit} className="mb-6">
				<input
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Event Name"
					className="border p-2 mb-2 w-full bg-gray-800 text-white"
				/>
				<input
					name="venue"
					value={formData.venue}
					onChange={handleChange}
					placeholder="Venue"
					className="border p-2 mb-2 w-full bg-gray-800 text-white"
				/>
				<input
					name="date"
					value={formData.date}
					onChange={handleChange}
					placeholder="Date"
					type="date"
					className="border p-2 mb-2 w-full bg-gray-800 text-white"
				/>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Description"
					className="border p-2 mb-2 w-full bg-gray-800 text-white"
				></textarea>
				<input
					name="totalTickets"
					value={formData.totalTickets}
					onChange={handleChange}
					placeholder="Total tickets"
					type="number"
					className="border p-2 mb-2 w-full bg-gray-800 text-white"
				/>
				<input
					name="ticketPrice"
					value={formData.ticketPrice}
					onChange={handleChange}
					placeholder="Ticket Price"
					type="number"
					className="border p-2 mb-2 w-full bg-gray-800 text-white"
				/>
				<button
					type="submit"
					className={`bg-blue-600 text-white py-2 px-4 rounded  ${!checkFormDataField(formData) ? 'opacity-50 pointer-events-none' : ''}`}
				>
					{"Add Event"}
				</button>
			</form>

			<h2 className="text-2xl font-bold mb-4">Existing Events</h2>
			<ul>
				{events.map((event) => (
					<li key={event._id} className="mb-4">
						<div className="bg-gray-800 p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold">{event?.name}</h3>
							<p>{event?.description}</p>
							<p>Venue: {event?.venue}</p>
							<p>Date: {new Date(event?.date).toLocaleDateString()}</p>
							<p>Total Ticket: {event?.totalTickets}</p>
							<p>Ticket Price: ${event?.ticketPrice}</p>
							<button
								onClick={() => handleDelete(event?.id)}
								className="bg-red-600 text-white py-1 px-2 rounded mt-2"
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminDashboard;
