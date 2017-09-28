import test from 'ava';
import tb from '../';
import express from 'express';

const createServer = () => {
    const server = express();

    server.get('/exists', (req, res) => {
        res.json({ foo: "bar" });
    });

    return new Promise((resolve) => {
        const s = server.listen(0, () => resolve(s));
    });
};

const closeServer = (server) => new Promise((resolve) => server.close(resolve));

test("request implementation returns promise", (t) => {
    t.is(typeof tb.request, "function");
    const p = tb.request("http://localhost");
    t.true("then" in p);
    return t.throws(p);
});

test("request implementation success for existing endpoint", async (t) => {
    const server = await createServer();

    const resp = await tb.request(`http://localhost:${server.address().port}/exists`);

    t.deepEqual(resp, { foo: "bar" });

    closeServer(server);
});

test("request implementation fails for inexistant endpoint", async (t) => {
    const server = await createServer();

    const resp = await t.throws(tb.request(`http://localhost:${server.address().port}/error`));
    t.deepEqual(resp, {
        code: 404,
        text: "Not Found"
    });

    closeServer(server);
});

test("request implementation fails for non-answering endpoint", async (t) => {
    const resp = await t.throws(tb.request("http://error.localhost:/error"));
    t.is(resp.code, 0);
});
