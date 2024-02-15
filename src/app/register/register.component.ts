import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';
import {  Router } from '@angular/router';
import { forbiddenNameValidator } from '../shared/user-name.validator';
import { passwordValidator } from '../passwordvalidation/password.validator';
import { AutherizationService } from '../autherization.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 registrationForm:FormGroup;
 submitted=false;
  constructor(private fb:FormBuilder,private route:Router,private auth:AutherizationService){

  }
  get addressPostalCode() {
    return this.registrationForm.get('address.postalcode');
  }
  get city()
  {
    return this.registrationForm.get('address.city');
  }
  get state()
  {
    return this.registrationForm.get('address.state');
  }
  get username(){
    return this.registrationForm.get('username')
  }
  get emailid()
  {
    return this.registrationForm.get('emailid')
  }
  get password()
  {
    return this.registrationForm.get('password')
  }
  get alternateEmails()
  {
    return this.registrationForm.get('alternateEmails') as FormArray
  }
  addAlternateEmail()
  {
    this.alternateEmails.push(this.fb.control('',[Validators.email]))
  }

  states=[
   {
     'id':1,
     'name':"AndhraPradesh",
     'code':'AP'
   },
   {
    'id':2,
    'name':"Tamilnadu",
    'code':'TN'
  },
  {
    'id':3,
    'name':"Karnataka",
  'code':'KS'
  },
  {
    'id':4,
    'name':"Telangana",
    'code':'TS'
  }
]
districts=[
  {
    id:1,
    name:'guntur',
    s_id:1
  },
  {
    id:2,
    name:'krishna',
    s_id:1
  },
  {
    id:3,
    name:'prakasam',
    s_id:1
  },
  {
    id:4,
    name:'east-godavari',
    s_id:1
  },
  {
    id:5,
    name:'chennai',
    s_id:2
  },
  {
    id:6,
    name:'kanyakumari',
    s_id:2
  },
  {
    id:7,
    name:'Ramanathapuram',
    s_id:2
  },
  {
    id:8,
    name:'Krishnagiri',
    s_id:2
  },
  {
    id:9,
    name:'Bidar',
    s_id:3
  },
  {
    id:10,
    name:'Chikballapur',
    s_id:3
  },
  {
    id:11,
    name:'Khammam',
    s_id:4
  },
  {
    id:12,
    name:'Kharimnagar',
    s_id:4
  },
  {
    id:13,
    name:'Mahabubabad',
    s_id:4
  },
]

filtereddistricts=this.districts;
updatedistricts(e:any)
{
   let sid=e.target.value;
   this.filtereddistricts=this.districts.filter(
    (res)=>res['s_id']==sid
    )
}
  ngOnInit() {

    this.registrationForm=this.fb.group({
      username:['',[Validators.required,Validators.minLength(3),forbiddenNameValidator]],
      emailid:['',[Validators.required,Validators.email]],
      subscribe:[false],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]],
      address:this.fb.group({
        city:['',[Validators.required]],
     
        postalcode:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]]
      }),alternateEmails:this.fb.array([]),

    },{validators:passwordValidator});
    this.registrationForm.get('subscribe').valueChanges.subscribe((checkedValue: any)=>{
      const email=this.registrationForm.get('emailid')
      if(checkedValue)
      {
        email.setValidators(Validators.required)
      }
      else
      {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })
  }
 onSubmit()
 {
  this.submitted=true;
  console.log(this.registrationForm.value)
const postdata={...this.registrationForm.value}
delete postdata.confirmPassword,
delete postdata.address.city,
delete postdata.address.state,
delete postdata.address.postalcode
this.auth.registerUser(postdata as User).subscribe(
  response=>{

    if(this.registrationForm.valid)
    {
      console.log(response)
    this.route.navigate(['/login'])
    }
  },
  errors=>{
    console.log(errors)
  }
)

 }
 reset()
 {
  this.submitted=false;
  this.registrationForm.reset();
 }
//  validateemail(control:any):boolean
//  {
//   const existingemailid={...this.registrationForm.emailid.value}
//   if(existingemailid.includes(control.value))
//   {
//     return true ;
//   }
//   else{
//     return null
//   }
//  }


//  registrationForm=this.fb.FormBuilder
  // registrationForm=new FormGroup
  // ({
  //   username:new FormControl('veda'),
  //   password:new FormControl(''),
  //   confirmPassword:new FormControl(''),
  //  address:new FormGroup
  //         ({
  //    city:new FormControl(''),
  //    state:new FormControl(''),
  //    postalcode:new FormControl('')
  //           })
  //   })

  Loadapidata()
    {
      this.registrationForm.patchValue({
        username:'test',
        password:'test',
        confirmPassword:'test',
        address:{
         city:'city',
         state:'state',
         postalcode:'1234'
        }
      })
  //   }
  }
}

