import MenuBar from './components/MenuBar';
import { BiSave, BiPrinter, BiSearch, BiInfoCircle } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";

/**
 * 
 * @returns 
 */
function App() {
  return (
    <>
      <MenuBar/>
      <button><BiSave/></button>
      <button><BiPrinter/></button>
      <button><BiSearch/></button>
      <button><BiInfoCircle /></button>
      <button><GiMoneyStack /></button>
      <table>
        <tr>
          <th>TYPE</th>
          <th>SELLER</th>
          <th>TITLE</th>
          <th>INSTRUCTION TIME</th>
          <th>CLOCKED TIME</th>
          <th>AMOUNT</th>
          <th>PRICE</th>
          <th>DISCOUNT</th>
          <th>COLLECTED</th>
        </tr>
        <tr>
          <td></td>
          <td>PERSON 1</td>
          <td>JOB 1: JOB TITLE HERE</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>x</td>
          <td>PERSON 1</td>
          <td>WORK DESCRIPTION</td>
          <td>1.00</td>
          <td></td>
          <td>1.00</td>
          <td><input type='text'/></td>
          <td><input type='text'/></td>
          <td></td>
        </tr>
        <tr>
          <td>x</td>
          <td>PERSON 1</td>
          <td>1234567, SHELF 1, PART NAME</td>
          <td></td>
          <td></td>
          <td>1.00</td>
          <td><input type='text'/></td>
          <td><input type='text'/></td>
          <td></td>
        </tr>
      </table>
    </>
  )
}

export default App
