
import styles from "./us.module.scss"
import MentorProfile from "@/components/MentorProfile";

async function getMentors() {
    const response = await fetch("http://localhost:8080/mentor");

    const json = await response.json();

    const mentorList : Mentor[] = []; 

    json.map((mentor : any) => {
        const newMentor = {
            type: "Mentor",
            id : mentor.mentor_id,
            email : mentor.mentor_email,
            img : mentor.mentor_img,
            nickname : mentor.mentor_nickname,
            phone : mentor.mentor_phone,
            company : mentor.mentor_company,
            category : mentor.mentor_category,
            position : mentor.mentor_position,
            career : mentor.mentor_career,
            isChecked : mentor.mentor_is_checked,
            warningCount : mentor.mentor_warning_count,
            favoriteCount : mentor.mentor_favorite_count,
            gender : mentor.mentor_gender,
            joinDate : mentor.mentor_joinDate,
            suspension : mentor.mentor_suspension,
        }

        mentorList.push(newMentor);
    })


    return mentorList;
}

export default async function WithUs () {

    const mentors = await getMentors();

    return (
        <>
        <main>
            <div className={styles.favoriteContainer}>

                {
                    mentors.map((mentor : Mentor) => {
                        return <MentorProfile 
                        nickname={mentor.nickname}
                        company={mentor.company}
                        position={mentor.position}
                        career={mentor.career}/>
                    })
                }
            </div>
        </main>

        </>
        
    )
}
