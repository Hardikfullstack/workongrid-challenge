import {useState} from "react";
import { useNavigate } from "react-router-dom";
import useComponentVisible from "../components/Hooks/useComponentVisible";


const initialData = [
    { id: 1, title: 'option 1' },
    { id: 2, title: 'option 2' },
    { id: 3, title: 'option 3' },
    { id: 4, title: 'option 4' },
    { id: 5, title: 'option 5' }
]

const HomePage = () => {
    const [selected, setMultiSelect] = useState([]);
    const [input, setInput] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState(initialData);
    const { ref, isComponentVisible } = useComponentVisible(false);
    const navigate = useNavigate();



    const handleChange = (e) => {
        const { value } = e.target;
        // console.log("value", value, "selected", selected, data.filter(i => selected.includes(String(i.id))));
        const newSelect = [...selected];
        if(selected.includes(value)){
            var index = newSelect.indexOf(value);
            if (index !== -1) {
                newSelect.splice(index, 1);
            }
        } else {
            newSelect.push(value);
        }
        setMultiSelect([...newSelect]);
        setInput(initialData.filter(i => newSelect.includes(String(i.id))).map(i => i.title))
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        // console.log("value", value, value.length, input,(input.join(' - ')+' ').length);
        if(value.length >= (input.join(' - ')+' ').length){
            let newString = value.replace(input.join(' - ')+' ', '');
            // console.log("newString", newString, newString.length);
            newString.length > -1 && setInputValue(newString);
            setData(initialData.filter(item => item.title.includes(newString)))
        }
    };

    return (
        <>
            <button style={{ padding: '10px' }} onClick={() => navigate('grid') }> go to Grid </button>
            <h2>multi select with searching</h2>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }} ref={ref}>
            <input style={{ width: '200px' }} value={input.join(' - ')+ ' '+inputValue} onChange={handleInputChange}  />
            {isComponentVisible && <select style={{ width: '200px' }} value={selected} onChange={handleChange} multiple>
                {data.map(item => <option key={item.title + item.id} value={item.id}>{item.title}</option>)}
            </select>}
        </div>
            <button onClick={() => {setMultiSelect([]); setInput([])}}> clear </button>
            <br />

        </>
    )
};

export default HomePage;
