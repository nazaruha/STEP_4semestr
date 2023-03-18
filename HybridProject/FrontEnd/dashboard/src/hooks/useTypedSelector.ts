import { TypedUseSelectorHook, useSelector } from "react-redux"; // hook - дає можливість доступатись до данних звідти звідки ми хочемо
import { RootState } from "../store/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector; // доступаємось до БД з цього компонента