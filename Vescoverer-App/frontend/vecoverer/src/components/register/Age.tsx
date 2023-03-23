import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FC, SetStateAction } from 'react';
import { useState } from 'react';
import { auth } from '../../firebase';


interface IProps {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const Age: FC<IProps> = ({callback}) => {

    const user = auth.currentUser?.email

const [selectedDate, setSelectedDate] = useState<Date>(new Date(2000, 10, 10));
const [age, setAge] = useState(0)

const actualAge = calculateAge(new Date(selectedDate.getFullYear(),selectedDate.getMonth(), selectedDate.getUTCDate()))
    

const h3Eele = document.getElementById("actual-age")

const handleDateChange = (date: Date | null) => {
  setSelectedDate(date as Date)
}


        //age : actualAge

  
  
  function calculateAge(date: Date) 
  {
    const now = new Date();
    const diff = Math.abs(now.getDate() - date.getDate() );
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
    return age
  } 

    return (
        <div className="date-picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
        disableToolbar
        variant="dialog"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Select your D.O.B"
        value={selectedDate}
        onChange={newDate => handleDateChange(newDate)}
        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}  
    />
    </MuiPickersUtilsProvider>
    <h3 id="actual-age"></h3>
    <button className="age-done-btn" id="age" onClick={(e) => callback(e)}>Next</button>
    </div>
    );
}

export default Age;