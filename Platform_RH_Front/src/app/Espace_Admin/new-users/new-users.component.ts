import { Component, OnInit, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { User } from 'src/app/User';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css']
})
export class NewUsersComponent implements AfterViewInit {
  isTabletOrPhoneScreen: boolean = false;
  showConfirmation: boolean = false;
  userData!: User; // Define a variable to store user data
  users: User[] = []; // Define an array to store user data
  id!: number;




 

  constructor(private renderer: Renderer2,private appService: AppServiceService, private router: Router ,
        private route: ActivatedRoute

    ) { }
  ngOnInit(): void {

    this.loadUserData(); this.appService.getAdminUsers().subscribe((data: User[]) => {
      this.users = data;
    });

  }
  loadUserData(): void {
    this.id = this.route.snapshot.params['id'];

    this.appService.getUserbyId(this.id).subscribe(
      (data: any) => { // Update type annotation here
        this.userData = data;
        console.log(this.userData);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getUserById(id: number): void {

  }
  ngAfterViewInit(): void {
    this.loadScripts();
  }

  loadScripts(): void {
    const scriptUrls = [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jquery-steps/1.1.0/jquery.steps.min.js',
    ];

    scriptUrls.forEach(url => {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'src', url);
      this.renderer.appendChild(document.body, script);
    });

    // Initialize wizard after scripts are loaded
    Promise.all(scriptUrls.map(url => this.loadScript(url))).then(() => {
      this.initWizard();
    });
  }

  private loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.onload = resolve;
      script.onerror = reject;
      this.renderer.setAttribute(script, 'src', url);
      this.renderer.appendChild(document.body, script);
    });
  }



  initWizard(): void {
    $('#wizard1').steps({
      headerTag: 'h3',
      bodyTag: 'div',
      autoFocus: true,
      titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',

      onFinished: () => {         this.showConfirmationAlert();       }
    });

    $('#wizard2').steps({
      headerTag: 'h3',
      bodyTag: 'div',
      autoFocus: true,
      titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',

    });

    $('#wizard3').steps({
      headerTag: 'h3',
      bodyTag: 'div',
      autoFocus: true,
      titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
      stepsOrientation: 1
    });

    $('#wizard4').steps({
      headerTag: 'h3',
      bodyTag: 'div',
      autoFocus: true,
      titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>'
    });
  }

  showConfirmationAlert(): void {
    const confirmed = confirm('Please take your time. Are you sure you want to accept this Gérant or delete it?');
    console.log('User ID:', this.id);
    if (this.userData && this.userData.entreprise && this.userData.entreprise.length > 0) {
      console.log('Enterprise Name:', this.userData.entreprise[0].entrepriseName);
    } else {
      console.log('Enterprise information not available');
    }

    if (confirmed) {
      this.router.navigate(['/Entrepreuneurs']);

      this.appService.ActiverUser(this.id).subscribe(
        () => {
          console.log('User activated successfully');
          this.router.navigate(['/Entrepreuneurs']);
        }

      );
      this.appService.SendConfirmation(this.id).subscribe(
        () => {
          console.log('SendConfirmation successfully');
          this.router.navigate(['/Entrepreuneurs']);
        }

      );

    } else {
      this.router.navigate(['/Entrepreuneurs']);
      this.appService.DeleteUser(this.id, this.userData.entreprise[0].entrepriseName).subscribe(
        () => {
          this.router.navigate(['/']);

          console.log('User deleted successfully');

        }
      );
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isTabletOrPhoneScreen = window.innerWidth <= 768;
  }
  onAccept(): void {
    console.log('c accepted')
    if (confirm('Are you sure you want to accept?')) {
      this.showConfirmation = true;
    }
  }

  onCancel(): void {

    const confirmed = confirm('Are you sure you want to archive this Gérant?');
    if (confirmed) {
      this.showConfirmation = false;

    }
    console.log('c bon')


  }
  onDelete(): void {
    console.log('c delete')
    const confirmed = confirm('Are you sure you want to delete this Gérant?');
    if (confirmed) {
      this.showConfirmation = false;

    }
    console.log('c bon')

  }

  showDeletedAlert() {
  }
  }

