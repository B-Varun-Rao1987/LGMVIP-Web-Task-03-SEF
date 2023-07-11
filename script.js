(function(){

    // skill script --->
    
    const skill=document.querySelector('#skills');
    const addBtn=document.querySelector('.addBtn');
    const skillList=document.querySelector('.skillList');
        
    function addSkillWrtJSON(skills){
        skillList.innerHTML="";
        for(let i=0;i<skills.length;i++){
            const skillText=skills[i];
            const li=document.createElement('li');
            const listItem=document.createElement('span');
            const remList=document.createElement('a'); 
            listItem.className="listItem";
            listItem.innerText=skillText;
            remList.className="remList";
            remList.addEventListener('click',deleteTask);
            remList.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-fill delBtn" viewBox="0 0 16 16"><path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" /></svg>';
            li.append(listItem);
            li.append(remList);
            skillList.append(li);
        }
    }

    let mySkills=[];

    function addSkill(skillText){
        let getAllSkills=JSON.parse(sessionStorage.getItem("mySkillStore"));
        mySkills=[];
        sessionStorage.clear();
        for(let i=0;i<getAllSkills.length;i++)
            mySkills.push(getAllSkills[i]);
        mySkills.push(skillText);
        sessionStorage.setItem("mySkillStore",JSON.stringify(mySkills));

        skill.innerHTML="";
        addSkillWrtJSON(mySkills);
    }

    addBtn.addEventListener('click',function(e){
        e.preventDefault();
        const skillText=skill.value;
        if(skillText!==""){
            addSkill(skillText);
            skill.value="";
        }
    });



    function deleteTask(e){
        const delListItem=e.target.parentElement.parentElement.parentElement;
        console.log(delListItem);
        const delListItemText=delListItem.firstChild.innerText;
        mySkills=mySkills.filter((eachSkill)=>{
            return (eachSkill!==delListItemText)&&(eachSkill!==null);
        });
        sessionStorage.setItem("mySkillStore",JSON.stringify(mySkills));
    
        delListItem.remove();
    }

    // skill script finishes

    const detailsForm=document.querySelector('#student_details_form');

    let allStudentDetails=[];

    detailsForm.addEventListener('submit',handleFormSubmit);
    function handleFormSubmit(evt){
        evt.preventDefault();

        const studentDetails={
            name:evt.target.elements["name"].value,
            email:evt.target.elements["email"].value,
            webUrl:evt.target.elements["webUrl"].value,
            photoLink:evt.target.elements["photo"].value,
            gender:evt.target.elements["gender"].value,
            skills:JSON.parse(sessionStorage.getItem("mySkillStore"))
        };

        let prevStudDetails=JSON.parse(sessionStorage.getItem("myStudentDetailStore"));
        if(prevStudDetails!==null){
            for(let i=0;i<prevStudDetails.length;i++)
                allStudentDetails.push(prevStudDetails[i]);
        }
        allStudentDetails.push(studentDetails);
        mySkills=[];
        sessionStorage.setItem("mySkillStore",JSON.stringify(mySkills));
        sessionStorage.setItem("myStudentDetailStore",JSON.stringify(allStudentDetails));

        //create card here...

        let studentListContainer=document.getElementById('student_container');
        const studentListTitle=document.getElementById('title');

        if(studentListContainer.children.length==0){
            studentListTitle.innerHTML="Students List";
        }

        //add card here...
        
        for(let i=0;i<detailsForm.length;i++){
            detailsForm.elements[i].value="";
        }
        document.getElementById("male").checked=false;
        document.getElementById("female").checked=false;


        document.querySelector('.skillList').innerHTML="";

        createStudentCards();
    }


    function createStudentCards(){
        let studentListContainer=document.getElementById('student_container');
        let studentDetails=JSON.parse(sessionStorage.getItem("myStudentDetailStore"));
        const enrollList=document.createElement('ul');
        enrollList.className="enrollList";
        const heading=document.createElement('div');
        heading.className="heading";
        const descHead=document.createElement('h2');
        descHead.innerText="DESCRIPTION";
        const imgHead=document.createElement('h2');
        imgHead.innerText="IMAGE";
        heading.append(descHead);
        heading.append(imgHead);
        enrollList.append(heading);
        studentListContainer.innerHTML="";
        studentListContainer.append(enrollList);
        for(let i=0;i<studentDetails.length;i++){
            const container=document.createElement('div');
            container.className="container";
            const description=document.createElement('div');
            description.className="description";
            const details=document.createElement('div');
            details.className="details";
            const sName=document.createElement('p'); 
            const sGender=document.createElement('p'); 
            const sEmail=document.createElement('p'); 
            const sWebUrl=document.createElement('p');
            sName.innerText=studentDetails[i].name;
            sGender.innerText=studentDetails[i].gender;
            sEmail.innerText=studentDetails[i].email;
            if(studentDetails[i].webUrl==="")
                sWebUrl.innerText="no website";
            else
                sWebUrl.innerText=studentDetails[i].webUrl;
            details.append(sName);
            details.append(sGender);
            details.append(sEmail);
            details.append(sWebUrl);
            const sSkills=document.createElement('div');
            sSkills.className="skills";
            const skillsOfStudent=studentDetails[i].skills;
            for(let j=0;j<skillsOfStudent.length;j++){
                const span=document.createElement('span');
                span.innerText=skillsOfStudent[j];
                sSkills.append(span);
            }
            details.append(sSkills);
            const removeBtn=document.createElement('a');
            removeBtn.href="#";
            removeBtn.className="removeBtn";
            removeBtn.innerText="Remove";
            removeBtn.addEventListener('click',removeListItem);
            details.append(removeBtn);
            description.append(details);
            const image=document.createElement('div');
            image.className="image";
            const sImage=document.createElement('img');
            sImage.setAttribute('src',studentDetails[i].photoLink);
            image.append(sImage);
            container.append(description);
            container.append(image);
            studentListContainer.append(container);
        }
        let images=document.querySelectorAll('.image');
        if(images!==null){
            images.forEach(eachImage=>{
                eachImage.style.height=eachImage.parentElement.children[0].children[0].offsetHeight+"px";
            }); 
        }
    }

    function removeListItem(e){
        const delListItem=e.target.parentElement.parentElement.parentElement;
        console.log(delListItem);
        let studentListContainer=document.querySelector('#student_container');
        let enrollList=document.querySelector('.enrollList');
        mySkills=mySkills.filter((eachSkill)=>{
            return (eachSkill!==delListItem.innerText)&&(eachSkill!==null);
        });
    
        let allStudents=JSON.parse(sessionStorage.getItem("myStudentDetailStore"));;

        let delStudentEmail=e.target.parentElement.children[2].innerText;
        if(allStudents!==null){
            allStudents=allStudents.filter(eachStudent=>{
                return eachStudent.email!==delStudentEmail;
            });
            allStudentDetails=[];
            allStudents.forEach(eachStudent=>{
                allStudentDetails.push(eachStudent);
            })
            sessionStorage.setItem("myStudentDetailStore",JSON.stringify(allStudents));
            if(allStudents.length===0){
                document.querySelector('#title').innerText="Enter Student Details";
                enrollList.style.display="none";
            }
            else{
                document.querySelector('#title').innerText="Students List";
                enrollList.style.display="block";
            }
            delListItem.remove();
        }
    

        mySkills=[];
        sessionStorage.setItem("mySkillStore",JSON.stringify(mySkills));
        
    }

    window.addEventListener('resize',function(){
        let images=document.querySelectorAll('.image');
        if(images!==null){
            images.forEach(eachImage=>{
                eachImage.style.height=eachImage.parentElement.children[0].children[0].offsetHeight+"px";
            }); 
        }
    })

    let dBtns=document.querySelectorAll('.delBtn');;

    window.addEventListener('load',()=>{

        //skills =>

            let getAllTasks=JSON.parse(sessionStorage.getItem("mySkillStore"));
            if(getAllTasks!==null){
                getAllTasks.forEach((eachTask)=>{
                    mySkills.push(eachTask);
                })
                addSkillWrtJSON(mySkills);
            }
            else{
            sessionStorage.setItem("mySkillStore",JSON.stringify(mySkills));
            }
            dBtns=document.querySelectorAll('.delBtn');

            if(dBtns!==null){
                dBtns.forEach((btn)=>{
                    btn.addEventListener('click',deleteTask);
            })
        }
        // <=

        let studentDetails=JSON.parse(sessionStorage.getItem("myStudentDetailStore"));
        allStudentDetails=[];
        if(studentDetails!==null && studentDetails.length!==0){
            for(let i=0;i<studentDetails.length;i++)
                allStudentDetails.push(studentDetails[i]);  
            const enrollList=document.querySelector('.enrollList');
            if(enrollList!==null)
                enrollList.style.display="block";
            document.querySelector('#title').innerText="Students List";
            createStudentCards();
        }
        else{
            allStudentDetails=[];
            sessionStorage.setItem("myStudentDetailStore",JSON.stringify(allStudentDetails));
            const enrollList=document.querySelector('.enrollList');
            if(enrollList!==null)
                enrollList.style.display="none";
            document.querySelector('#title').innerText="Enter Student Details";
        }
        let images=document.querySelectorAll('.image');
        if(images!==null){
            images.forEach(eachImage=>{
                eachImage.style.height=eachImage.parentElement.children[0].children[0].offsetHeight+"px";
            }); 
        }
    });    
    
})();
    
    
    
