import NoteDisplay from "../components/NoteDisplay";
import { useNoteData } from "../contexts/NotesContext"


export default function Homepage(props){

	const globalNotesData = useNoteData();
	// const [someData, someFunction] = useContext(SomeContext);

	return(
		<div>
			<h1>Note Taking Application</h1>


			<h3>We have {globalNotesData.length} notes in storage!</h3>

			<h3>List of All Notes:</h3>
			{globalNotesData.map((note) => {
				return(
				<div key={note.id}>
					<NoteDisplay id={note.id} />
				</div>
				);
			})}
		</div>
	)
}