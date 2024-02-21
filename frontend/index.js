async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

 
const baseURL = 'http://localhost:3003/api/learners'
const mentorURL = 'http://localhost:3003/api/mentors'
const fetchLearner = document.querySelector(".info")
fetchLearner.textContent = 'No learner is selected'

Promise.all([
  axios.get(baseURL), 
  axios.get(mentorURL)
])
.then((res) => {
  let [res1, res2] = res
  const data1 = res1.data
  const data2 = res2.data

  const section = document.querySelector('section')
  const cardHolder = document.querySelector('.cards')
  

  function buildLearnerCard(learner, mentors) {
      const card = document.createElement('div')
      card.classList.add('card')

      const name = document.createElement('h3')
      name.textContent = `${learner.fullName}`

      const email = document.createElement("div")
      email.textContent = learner.email

      const mentorHeading = document.createElement('h4')
      mentorHeading.textContent = 'Mentors'
      mentorHeading.classList.add('closed')

      const mentorList = document.createElement('ul')
      
      

      
      mentors.forEach(mentor => {
          const mentorItem = document.createElement('li')
          mentorItem.textContent = `${mentor.firstName} ${mentor.lastName}`
          mentorList.appendChild(mentorItem)
      })


      mentorHeading.addEventListener('click' , () => {
        document.querySelectorAll('.h4').forEach(mentor => mentor.classList.remove('open'))
        mentorHeading.classList.toggle('open')
        if(mentorHeading.classList.contains('open')) {
          mentorHeading.appendChild(mentorList)
        } else if (mentorHeading.classList.contains('closed')) {
          mentorHeading.removeChild(mentorList)
        }
      })

      card.appendChild(name)
      card.appendChild(email)
      card.appendChild(mentorHeading)

      
      card.addEventListener('click', () => {
          if(!card.classList.contains('selected')) {
            document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'))
            name.textContent = `${learner.fullName}, ID ${learner.id}`
            fetchLearner.textContent = `The selected learner is ${learner.fullName}`
            card.classList.add('selected')
          } else {
            name.textContent = `${learner.fullName}`
            fetchLearner.textContent = 'No learner is selected'
            card.classList.remove('selected')
          }
        
          })

      document.addEventListener('click' , evt => {
          if(evt.target === card.classList.contains('selected')){
            name.textContent = `${learner.fullName}`
            fetchLearner.textContent = 'No learner is selected'
            }
        })
          
  

      return card
  }

 
  data1.forEach(learner => {
      
      const learnerMentors = data2.filter(mentor => learner.mentors.includes(mentor.id))
      
      const learnerCard = buildLearnerCard(learner, learnerMentors)
      
      section.appendChild(cardHolder)
      cardHolder.appendChild(learnerCard)
  })
})
.catch(error => {
  console.error(error)
})

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
