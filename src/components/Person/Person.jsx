

const Person = () => {
  // are we retrieving a person from context or are we doing a getOne fetch on useEffect

  // function createPerson()
    // get input on submit
    // create fetch

  // function editPerson()

  // if useParams id OR person not null, then edit person
  return (
    <section className="addPerson">
      <form action="#">
        <label for="persName">Name</label>
        <input type="text" name="persName" id="persName" required></input>

        <label for="dob">Date of birth</label>
        <input type="date" name="dob" id="dob" min="2013-01-01" required></input>
        
        <button class="btn">Save</button>
        <button class="btn">Delete</button>
        <button class="btn">Cancel</button>
      </form>
      
    </section>
  )
  // else add person
}

export default Person