// reservation.test.js
const request = require('supertest');
const app = require('./app'); // Caminho para o app.js

describe('Testes de Aceitação - Sistema de Reserva de Hotéis', () => {
  let reservationId;

  // Teste para criar uma nova reserva
  it('Deve criar uma nova reserva com sucesso', async () => {
    const response = await request(app)
      .post('/api/reservations')
      .send({
        name: 'João Silva',
        email: 'joao.silva@example.com',
        checkInDate: '2024-12-01',
        checkOutDate: '2024-12-05',
        roomId: 101
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Reserva confirmada');
    expect(response.body).toHaveProperty('reservationId');
    reservationId = response.body.reservationId;
  });

  // Teste para tentar reservar um quarto já reservado
  it('Deve retornar erro ao tentar reservar um quarto indisponível', async () => {
    const response = await request(app)
      .post('/api/reservations')
      .send({
        name: 'Wanfranllin Alves',
        email: 'Wan.alves@example.com',
        checkInDate: '2024-12-01',
        checkOutDate: '2024-12-05',
        roomId: 101
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Quarto indisponível para as datas selecionadas');
  });

  // Teste para cancelar a reserva criada
  it('Deve cancelar uma reserva existente', async () => {
    const response = await request(app)
      .delete(`/api/reservations/${reservationId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Reserva cancelada com sucesso');
  });
});
