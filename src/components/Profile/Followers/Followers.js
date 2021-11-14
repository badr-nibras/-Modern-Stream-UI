import React from 'react';
import './Followers.scss';

var data = [
    {
        name: 'Fayssal Elmekkaoui',
        phone: '555-1234',
        email: 'snowwhite@ouatmail.com',
        address: '945 N. Storybrook Ln',
        image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGEJHHZLNITQQ/profile-displayphoto-shrink_800_800/0/1595289959603?e=1635379200&v=beta&t=20bmbfivQZxci1SG9PyCit6OL-m2sESlR8uyLCT6y8U',
        isActive: true
    },
    {
        name: 'David Nolan',
        phone: '555-9876',
        email: 'princecharming@ouatmail.com',
        address: '945 N. Storybrook Ln',
        image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGEJHHZLNITQQ/profile-displayphoto-shrink_800_800/0/1595289959603?e=1635379200&v=beta&t=20bmbfivQZxci1SG9PyCit6OL-m2sESlR8uyLCT6y8U',
        isActive: false
    },
    {
        name: 'Fayssal Elmekkaoui',
        phone: '555-1234',
        email: 'snowwhite@ouatmail.com',
        address: '945 N. Storybrook Ln',
        image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGEJHHZLNITQQ/profile-displayphoto-shrink_800_800/0/1595289959603?e=1635379200&v=beta&t=20bmbfivQZxci1SG9PyCit6OL-m2sESlR8uyLCT6y8U',
        isActive: true
    },
    {
        name: 'David Nolan',
        phone: '555-9876',
        email: 'princecharming@ouatmail.com',
        address: '945 N. Storybrook Ln',
        image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGEJHHZLNITQQ/profile-displayphoto-shrink_800_800/0/1595289959603?e=1635379200&v=beta&t=20bmbfivQZxci1SG9PyCit6OL-m2sESlR8uyLCT6y8U',
        isActive: false
    },

    {
        name: 'Fayssal Elmekkaoui',
        phone: '555-1234',
        email: 'snowwhite@ouatmail.com',
        address: '945 N. Storybrook Ln',
        image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGEJHHZLNITQQ/profile-displayphoto-shrink_800_800/0/1595289959603?e=1635379200&v=beta&t=20bmbfivQZxci1SG9PyCit6OL-m2sESlR8uyLCT6y8U',
        isActive: true
    },
    {
        name: 'David Nolan',
        phone: '555-9876',
        email: 'princecharming@ouatmail.com',
        address: '945 N. Storybrook Ln',
        image: 'https://media-exp1.licdn.com/dms/image/C4D03AQGEJHHZLNITQQ/profile-displayphoto-shrink_800_800/0/1595289959603?e=1635379200&v=beta&t=20bmbfivQZxci1SG9PyCit6OL-m2sESlR8uyLCT6y8U',
        isActive: false
    },


];
const lenght = data.length



class Followers extends React.Component {
    constructor(props) {
        super(props);

        const people = [];

        for (let i = 0; i < lenght; i++) {
            people.push({
                name: data[i].name,
                image: data[i].image
            });
        }

        this.state = { people };
    }





    

    render() {
        return (

            <div className="Followers">
                <div className="left">

                    <div className="contacts-container">
                        {this.state.people.map((person, index) => (
                            
                            <div className="contact" >
                                <img className="image" src={person.image} alt="image" />
                                <span className="name">{person.name}</span>
                            </div>
                        ))}

                       

                    </div>
                </div>

            </div>
        );

    }
}




export default Followers;