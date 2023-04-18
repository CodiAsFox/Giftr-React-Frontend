import AddPerson from '../AddPerson/AddPerson'

const Person = () => {
  // if id, AddPerson, else edit
  return (
    <section className="person">
      <AddPerson/>
      {/* {else edit person} */}
    </section>
  )
}

export default Person