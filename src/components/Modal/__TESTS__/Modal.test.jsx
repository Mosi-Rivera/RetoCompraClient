import { useEffect, useState } from 'react';
import Modal from '../Modal';
import {fireEvent, render, screen} from '@testing-library/react';
import { beforeEach, expect } from 'vitest';

describe("Form Modal Component", () => {
    const attrs = {
        button_text: "register",
        title: "REGISTER"
    };
    const Element = ({attrs}) => {
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const methods = {
            handleClose,
            handleOpen
        }
        useEffect(() => console.log(open), [open]);
        return <Modal id="modal" {...attrs} {...methods} open={open}>
            <form data-testid="form">
                <input data-testid="email" type="email" name="email" id="email" placeholder='email'/>
                <input data-testid="password" type="password" name="password" id="password" placeholder='password'/>
                <input data-testid="submit" type="submit" value="Submit" />
            </form>
        </Modal>
    }
    beforeEach(() => render(<Element attrs={attrs}/>));

    test("Should render button text.", () => {
        expect(screen.getByText(attrs.button_text)).toBeDefined();
    });
    test("Should not render modal by default.", () => {
        expect(screen.queryByTestId("modal")).toBeNull();
    });
    test("Should toggle modal when button pressed.", () => {
        const button = screen.getByTestId('button');
        expect(screen.queryByTestId("modal")).toBeNull();
        fireEvent.click(button);
        expect(screen.queryByTestId("modal")).not.toBeNull();
    });
    //CANT TEST FOR CLOSE BECAUSE MUI DIALOG IMPLEMENTATION BREAKS DOM?
    test("Should render title.", async () => {
        const button = screen.getByTestId('button');
        fireEvent.click(button);
        expect(screen.queryByTestId("title")).not.toBeNull();
        expect(screen.queryByTestId("title").innerHTML).toBe(attrs.title);
    });
    test("Should display children", () => {
        const button = screen.getByTestId('button');
        fireEvent.click(button);
        expect(screen.queryByTestId('form')).not.toBeNull();
        expect(screen.queryByTestId('email')).not.toBeNull();
        expect(screen.queryByTestId('password')).not.toBeNull();
        expect(screen.queryByTestId('submit')).not.toBeNull();
    })
});