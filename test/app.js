// app.js
const express = require('express');
const app = express();

app.use(express.json());

const reservations = [];
const rooms = [{ id: 101, isAvailable: true }];

// Endpoint para criar uma nova reserva
app.post('/api/reservations', (req, res) => {
  const { name, email, checkInDate, checkOutDate, roomId } = req.body;
  const room = rooms.find((r) => r.id === roomId);

  if (!room || !room.isAvailable) {
    return res.status(400).json({ error: 'Quarto indisponível para as datas selecionadas' });
  }

  const reservationId = reservations.length + 1;
  reservations.push({ reservationId, name, email, checkInDate, checkOutDate, roomId });
  room.isAvailable = false; // Marca o quarto como indisponível
  res.status(201).json({ message: 'Reserva confirmada', reservationId });
});

// Endpoint para cancelar uma reserva
app.delete('/api/reservations/:id', (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex((r) => r.reservationId == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Reserva não encontrada' });
  }

  reservations.splice(index, 1);
  rooms.find((r) => r.id === 101).isAvailable = true; // Libera o quarto
  res.status(200).json({ message: 'Reserva cancelada com sucesso' });
});

module.exports = app;
