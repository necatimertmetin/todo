import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [itemList, setItemList] = useState([]);
  const [input, setInput] = useState('');
  const [booleanValue, setBooleanValue] = useState(false);


  const addItem = (inputtedTitle) => {
    const newItem = {
      id: itemList.length + 1,
      title: inputtedTitle,
      completed: false  // yeni eklenen öğe tamamlanmamış olarak başlar
    };
    setItemList([...itemList, newItem]);
  };

  const deleteItem = (id) => {
    const updatedList = itemList.filter(item => item.id !== id);
    setItemList(updatedList);
  };

  const toggleComplete = (id) => {
    const updatedList = itemList.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItemList(updatedList);
  };


  const asc = (item) => {
    const index = itemList.findIndex(el => el === item);
    if (index > 0) {
      const newList = [...itemList];
      const temp = newList[index];
      newList[index] = newList[index - 1];
      newList[index - 1] = temp;
      setItemList(newList);
    }
  };

  // desc fonksiyonu: Bir öğeyi bir sonraki öğeyle yer değiştirir
  const desc = (item) => {
    const index = itemList.findIndex(el => el === item);
    if (index < itemList.length - 1) {
      const newList = [...itemList];
      const temp = newList[index];
      newList[index] = newList[index + 1];
      newList[index + 1] = temp;
      setItemList(newList);
    }
  };




  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan itemList'i al
    const storedItemList = JSON.parse(localStorage.getItem('notes'));
    if (storedItemList) {
      setItemList(storedItemList);
    }
  }, []);

  useEffect(() => {
    // itemList'i localStorage'a ekle
    if(booleanValue === true){
        localStorage.setItem('notes', JSON.stringify(itemList));
      
    }
    
    setBooleanValue(true);

  }, [itemList]);

  const ListItem = ({ item }) => {
    return (
      <div className='listItem'>
        <div className='sort-buttons-container'>
          <div className='sort asc' onClick={() => { asc(item) }}>
            {'<'}
          </div>
          <div className='sort desc' onClick={() => { desc(item) }}>
            {'>'}
          </div>
        </div>
        <input type='checkbox' className='check' checked={item.completed} onChange={() => toggleComplete(item.id)} />
        <div className={item.completed ? 'listItemTitle completed' : 'listItemTitle'}>
          {item.title}
        </div>
        <div className='delete' onClick={() => deleteItem(item.id)}>delete</div>
      </div>
    );
  };

  return (
    <div>
      <div className='input-container'>
        <input className='input' type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='add-button' onClick={() => { addItem(input); setInput(''); }}>Ekle</button>
      </div>

      {itemList.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default App;
