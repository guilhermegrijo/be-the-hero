const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection.js')

describe('ong', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Meu Amigo Cão",
                email: "mac@gmail.com",
                city: "Ipatinga",
                whatsapp: "3199999999",
                uf: "MG"
            })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})