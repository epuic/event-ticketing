import axios from "axios";

class EventService {
    static BASE_URL = "http://localhost:1010";

    static async getAllEvents(token) {
        try {
            const response = await axios.get(`${EventService.BASE_URL}/events/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllEventsUser(token) {
        try {
            const response = await axios.get(`${EventService.BASE_URL}/events/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteEvent(eventId, token) {
        try {
            const response = await axios.delete(
                `${EventService.BASE_URL}/admin/events/${eventId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async updateEvent(eventId, eventData, token) {
        try {
            const response = await axios.put(
                `${EventService.BASE_URL}/admin/events/update/${eventId}`,
                eventData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addEvent(eventData, token) {
        try {
            const response = await axios.post(
                `${EventService.BASE_URL}/admin/events`,
                eventData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getEventById(eventId, token){
        try{
            const response = await axios.get(`${EventService.BASE_URL}/admin/events/get-events/${eventId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getMyTickets(username, token) {
        try {
            const response = await axios.get(
                `${EventService.BASE_URL}/my-tickets`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { username },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async userBuyTickets(eventId, numberOfTickets, token) {
        return axios.post(
            `${EventService.BASE_URL}/events/${eventId}/buy`,
            null,
            {
                params: { numberOfTickets },
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }
}

export default EventService;
