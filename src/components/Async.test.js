import { render, screen } from "@testing-library/react";
import Async from "./Async";


describe('Async components', () => {
    // you don't want to send real API request instead you should use mock data or server.
    // test('render posts if request succeeds', async() => {
    //     render(<Async />);

    //     const listItemElements = await screen.findAllByRole('listitem');
    //     expect(listItemElements).not.toHaveLength(0);
    // });

    test('render posts if request succeeds', async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: 'p1', title: "first title"}]
        });
        render(<Async />);

        const listItemElements = await screen.findAllByRole('listitem');
        expect(listItemElements).not.toHaveLength(0);
    })

});