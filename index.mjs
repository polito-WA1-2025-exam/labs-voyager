import express from 'express';
import morgan from 'morgan';
import { getBusinesses, getBusiness, postBusiness, putBusiness } from './dao.mjs';
import { getBag, getBags, getBagsOfBusiness, postBag, putBag } from './dao.mjs';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/api/businesses', async (req, res) => {
    getBusinesses()
    .then(businesses => res.json(businesses))
    .catch(err => res.status(500).end());
});

app.get('/api/businesses/:buId/', async (req, res) => {
    try {
        const business = await getBusiness(req.params.buId);
        if (business.error) {
            res.status(404).end();
        } else {
            res.json(business)
        }
    }
    catch {
        res.status(500).end();
    }
});

app.post('/api/businesses', (req, res) => {});
app.put('/api/businesses/:buId', (req, res) => {});

app.get('/api/bags', async (req, res) => {
    getBags()
    .then(bags => res.json(bags))
    .catch(err => res.status(500).end());
});

app.get('/api/businesses/:buId/bags', async (req, res) => {
    try {
        const bags = await getBagsOfBusiness(req.params.buId);
        if (bags.error) {
            res.status(404).end();
        } else {
            res.json(bags);
        }
    }
    catch {
        res.status(500).end();
    }
});

app.get('/api/bags/:bagId', async (req, res) => {
    try {
        const bag = await getBag(req.params.bagId);
        if (bag.error) {
            res.status(404).end();
        } else {
            res.json(bag);
        }
    }
    catch {
        res.status(500).end();
    }
});
app.post('/api/bags', (req, res) => {});
app.put('/api/bags/:bagId', (req, res) => {});

// TODO: add APIs for foodItem

app.listen(3000, () => console.log('Server ready at port 3000'));