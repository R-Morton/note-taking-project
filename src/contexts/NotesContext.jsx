import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

const initialNotesData = [
    {
        id: 1,
        title: "Welcome to the note taker",
        description: "Make your notes here",
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1), // Current time but one day in future
        createAtDate: Date.now()

    }
]

// Instructions.type determines how we edit the state

const notesReducer = (previousState, instructions) => {
    let stateEditable = [...previousState];

    switch (instructions.type){
        case "setup":
            console.log("Apply persistant data to state now")
            //instructions.data is provided when the dispatch function is called
            stateEditable = instructions.data
            
            // Whatever is returned is the new state data
            return stateEditable
        case "create":
            console.log("TODO: create note and add to state")

            let newNote = instructions.newNote;
            stateEditable.push(newNote)

            return stateEditable
            break
        case "update":
            console.log("TODO: Update specific note and overwrite it in state")
            break
        case "delete":
            console.log("TODO: Delete note from state")
            break
        case "sortByDueDate":
            console.log("Sorted state data by due date")
            break
        case "sortByCreatedAtDate":
            console.log("Sorted by created at date")
            break
        case "sortById":
            console.log("Sort by ID, this is the default order")
            break
        default:
            console.log("Invalid instruction type provided, it was:" + instructions.type)
            return previousState

    }
}

// How we make our reducer state and dispatch global
export const NoteDataContext = createContext(null)
export const NoteDispatchContext = createContext(null)

// Custom hooks, that provide direct access to one part of the reducer
// This is for read only data
export function useNoteData() {
    return useContext(NoteDataContext)
}

//function to modify the data
export function useNoteDispatch(){
    return useContext(NoteDispatchContext)
}

// props.children should be a JSX element. NotesProvider wraps around that element
export default function NotesProvider(props){
    const [notesData, notesDispatch] = useReducer(notesReducer, initialNotesData)

    
    const [persistantData, setPersistantData] = useLocalStorage('notes', JSON.stringify(initialNotesData))

    useEffect(() => {
        notesDispatch({type:"setup", data: persistantData})
    }, [])

    useEffect(() => {
        console.log("Local Storage: " + persistantData)
    }, [persistantData])


    //Autosaves changes to noted from reducer state into localstorage
    useEffect(() => {
        setPersistantData(JSON.stringify(notesData))
    }, [notesData])

    return (
        <NoteDataContext.Provider value={notesData}>
            <NoteDispatchContext.Provider value={notesDispatch}>
                {props.children}
            </NoteDispatchContext.Provider>
        </NoteDataContext.Provider>
    )
}