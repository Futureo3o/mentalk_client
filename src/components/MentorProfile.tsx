import styles from "./mentorProfile.module.scss"

interface MentorProfileProps {
    nickname : string;
    company : string;
    position: string;
    career : string;
}

const MentorProfile : React.FC<MentorProfileProps> = ({nickname, company, position}) => {

    return (
        <section className={styles.wrap}>
        {/* <div className={styles.titleContainer}>
            <p>막연하게 느껴지는 서비스 기획, 핵심은 “이것"입니다이것저것요것저것이것요것바로이것</p>
            <div className={styles.iconFrame}>
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z" fill-rule="nonzero"/></svg>
            </div>
        </div> */}
        <div className={styles.profileContainer}>

            <div className={styles.imgFrame}>

            </div>
            <div className={styles.infoContainer}>
                <p className={styles.nickname}>{nickname}</p>
                <p>{company}</p>
                <p>빅데이터 분석 전문가 | 시니어(5년차)</p>
            </div>
        </div>
        </section>
    )
}

export default MentorProfile;