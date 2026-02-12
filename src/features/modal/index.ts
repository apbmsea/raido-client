import { actions, reducer, name } from './model/modalSlice'

export const Modal = {
    reducer: {
        [name]: reducer
    },
    actions,
    name
};
export { default as ModalWindow } from './ui/Modal'