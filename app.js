const btnSearch = document.querySelector('.btn_search');
const body = document.querySelector('body');
const inputSearch = document.querySelector('#search');
const userBox = document.querySelector('.user_box');
const searchBox = document.querySelector('.search_box');
const modeContainer = document.querySelector('.mode');

//? Insert generated  markup
const userInfoBox = document.querySelector('.user_info');
const profileImg = document.querySelector('.profileImg')
const followBox = document.querySelector('.user_followings');
const userContact = document.querySelector('.user_contact');





const animeItem = bodymovin.loadAnimation({
    wrapper: modeContainer,
    animeType: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://assets9.lottiefiles.com/packages/lf20_gjedw3tk.json'
});


let animeDirection = 1;

modeContainer.addEventListener('click', () =>{
    animeItem.setDirection(animeDirection);
    animeItem.setSpeed(2);
    animeItem.play();
    animeDirection = -animeDirection;

    if(animeDirection=== -1) {
        
        setTimeout(function() {
            body.style.background= '#F5F8FF';
            body.style.color= '#000';
            followBox.style.background= '#ffb52c';
            searchBox.classList.add('active');
            userBox.classList.add('active');
            inputSearch.style.color='#000';
            
        },500)
    }
    else{
        setTimeout(function() {
            body.style.background= '#141C2F';
            body.style.color= '#fff';
            followBox.style.background= '#141C2F';
            searchBox.classList.remove('active');
            userBox.classList.remove('active');
        },500)
    }
})


const fetchUser = async function (userName){
    try {
        const rawData = await fetch(`https://api.github.com/users/${userName}`);
        const data = await rawData.json();
        // console.log(data);
        generateUserInfoMarkup(data);
        generateUserFollowerMarkup(data);
    }catch (err) {
        console.error(err);
    }
}


const generateUserInfoMarkup = function(data) {
    const ISODate = new Date(data.created_at);
    const date = `${ISODate.getDate()} ${ISODate.toLocaleString('default', { month: 'long' })} ${ISODate.getFullYear()}`


     const markup =`
        <div class="info_nav">
        <h1>${data.name}</h1>
        <h3>Joined ${date}</h3>
        </div>
        <a href="#">@${data.login}</a>
        <p>${data.bio ? data.bio : 'This user has no bio'}</p>
    `;
    userInfoBox.innerHTML = '';
    userInfoBox.insertAdjacentHTML('afterbegin',markup);
    profileImg.src = `${data.avatar_url}`
}

const generateUserFollowerMarkup = function(data) {
    const markup = `
    <div class="repos">
        <span>Repos</span>
        <h1>${data.public_repos}</h1>
    </div>
    <div class="followers">
        <span>Followers</span>
        <h1>${data.followers}</h1>
    </div>
    <div class="following">
        <span>Following</span>
        <h1>${data.following}</h1>
    </div>
    `
    followBox.innerHTML = '';
    followBox.insertAdjacentHTML('afterbegin',markup);
}


btnSearch.addEventListener('click',()=>{
    fetchUser(inputSearch.value);
});
