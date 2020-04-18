console.log('Before');
// getUser(1)
//   .then(user => getRepo(user))
//   .then(repo => getCommits(repo))
//   .then(commits => console.log(commits))
//   .catch(err=>console.log(err.message));




  //async await

async function displayCom (){
 try{
  const user = await getUser(1)
  const repo =await  getRepo(user);
  const commits = await getCommits(repo);
  console.log(commits);
 }
 catch(err){
     console.log(err.message);
 }
}

displayCom();

console.log('After');

function displayCommits(commits){
    console.log(commits);
}

function getCommits(repo){
    getCommits(repo,displayCommits)
}

function getRepo(user){
    getRepo(user,getCommits); 
}



function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(({id:id,user:"joe"}))
        },2000);
    })

}

function getRepo(user){
   return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(['repo1','repo2']);
    },2000)
  }) 

}

function getCommits(repo){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('repo1');
        },2000)

    })
}