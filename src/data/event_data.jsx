import MathCompetition from '../data/event_data_images/maths_competition.jpg'
import art_image from '../data/event_data_images/art_image.jpg'
import coding from '../data/event_data_images/coding.jpg'
import dance_image from '../data/event_data_images/dance_image.jpg'
import music_image from '../data/event_data_images/music_image.jpg'
import robotics from '../data/event_data_images/robotics.jpg'
import science_fare from '../data/event_data_images/science_fare.png'
import sports from '../data/event_data_images/sports.jpg'




const event_data = [
  {
    id: 1,
    name: "Mathematics Competition",
    description: "A competition to test mathematical skills",
    date: "07 Apr 2026",
    time: "10:00 AM",
    end_date: "29 Apr 2026",
    registration_deadline: "05 Apr 2026",
    location: "School Auditorium",
    image: MathCompetition,
    type: "competition",
    capacity: 100,
    registered: 45,
    status: "live",
    organizer: "Admin"
  },
  {
    id: 2,
    name: "Science Fair",
    description: "Students showcase science projects",
    date: "09 Apr 2026",
    time: "11:00 AM",
    end_date: "10 Apr 2026",
    registration_deadline: "07 Apr 2026",
    location: "Hall A",
    image: science_fare,
    type: "exhibition",
    capacity: 80,
    registered: 60,
    status: "completed",
    organizer: "Admin"
  },
  {
    id: 3,
    name: "Art Exhibition",
    description: "Creative student artworks display",
    date: "15 Apr 2026",
    time: "09:00 AM",
    end_date: "16 Apr 2026",
    registration_deadline: "13 Apr 2026",
    location: "Art Room",
    image: art_image,
    type: "exhibition",
    capacity: 50,
    registered: 35,
    status: "completed",
    organizer: "Admin"
  },
  {
    id: 4,
    name: "Sports Day",
    description: "Annual sports competition",
    date: "20 Apr 2026",
    time: "08:00 AM",
    end_date: "20 Apr 2026",
    registration_deadline: "18 Apr 2026",
    location: "Ground",
    image: sports,
    type: "sports",
    capacity: 200,
    registered: 150,
    status: "live",
    organizer: "Admin"
  },
  {
    id: 5,
    name: "Coding Hackathon",
    description: "24-hour coding challenge",
    date: "25 Apr 2026",
    time: "10:00 AM",
    end_date: "26 Apr 2026",
    registration_deadline: "23 Apr 2026",
    location: "Computer Lab",
    image: coding,
    type: "competition",
    capacity: 60,
    registered: 55,
    status: "live",
    organizer: "Admin"
  },
  {
    id: 6,
    name: "Music Fest",
    description: "Musical performances by students",
    date: "28 Apr 2026",
    time: "05:00 PM",
    end_date: "28 Apr 2026",
    registration_deadline: "26 Apr 2026",
    location: "Stage Area",
    image: music_image,
    type: "cultural",
    capacity: 120,
    registered: 90,
    status: "upcoming",
    organizer: "Admin"
  },
  {
    id: 7,
    name: "Dance Competition",
    description: "Solo and group dance battle",
    date: "02 May 2026",
    time: "04:00 PM",
    end_date: "02 May 2026",
    registration_deadline: "30 Apr 2026",
    location: "Hall B",
    image: dance_image,
    type: "cultural",
    capacity: 100,
    registered: 70,
    status: "upcoming",
    organizer: "Admin"
  },
  {
    id: 8,
    name: "Robotics Workshop",
    description: "Learn basics of robotics",
    date: "05 May 2026",
    time: "11:00 AM",
    end_date: "05 May 2026",
    registration_deadline: "03 May 2026",
    location: "Lab 2",
    image: robotics,
    type: "workshop",
    capacity: 40,
    registered: 30,
    status: "upcoming",
    organizer: "Admin"
  },
  {
    id: 9,
    name: "Quiz Competition",
    description: "General knowledge quiz",
    date: "08 May 2026",
    time: "10:00 AM",
    end_date: "08 May 2026",
    registration_deadline: "06 May 2026",
    location: "Classroom 3",
    image: "quiz.jpg",
    type: "competition",
    capacity: 60,
    registered: 40,
    status: "upcoming",
    organizer: "Admin"
  },
  {
    id: 10,
    name: "Drama Play",
    description: "Theatre performance by students",
    date: "10 May 2026",
    time: "06:00 PM",
    end_date: "10 May 2026",
    registration_deadline: "08 May 2026",
    location: "Auditorium",
    image: "drama.jpg",
    type: "cultural",
    capacity: 150,
    registered: 100,
    status: "upcoming",
    organizer: "Admin"
  },
]
export default event_data