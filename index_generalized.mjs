import express from 'express';
import morgan from 'morgan';

import { getBags } from './dao_generalized.mjs';
import { getBusinesses } from './dao_generalized.mjs';
import { getFoodItems } from './dao_generalized.mjs';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const getView = async (req, res, func) => {

    try {
        const objects = await func()
        if (objects.error){
            res.status(404).end();
        } else {
            res.json(objects);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

app.get('/api/businesses', async (req, res) => getView(req, res, getBusinesses));
app.get('/api/bags', async (req, res) => getView(req, res, getBags));
app.get('/api/fooditems', async (req, res) => getView(req, res, getFoodItems));

app.listen(3000, () => console.log('Server ready at port 3000'));