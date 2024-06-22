import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';  
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details-formation',
  templateUrl: './details-formation.component.html',
  styleUrl: './details-formation.component.css'
})
export class DetailsFormationComponent implements OnInit {
  id!: number;
  formation!: any;
  FormationForm!: FormGroup;
  categoriesList$: any;
  videoUrl!: SafeResourceUrl;
  isVideoVisible = false;


  constructor(
    private appServiceService: AppServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('id formation :', this.id);
    this.categoriesList$ = this.appServiceService.getAllCategories();
  
 
    this.formationbyid();
    this.getVideo();
  }
  
  formationbyid(): void 
  {
    this.appServiceService.getFormationById(this.id).subscribe(
      (data: any) => {
        this.formation = data;
        console.log('formation:', this.formation);
   }
    );
  }
  addLineBreaks(description: string): string {
    return description.replace(/\./g, '.<br>');
  }
  extractDate(dateString: string): string {
    return dateString.split("T")[0]; 
  }
  getVideo(): void {
    this.appServiceService.TelechargerFormation(this.id).subscribe(
      (data: Blob) => {
        const videoBlob = new Blob([data], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);
        // Assurez-vous que l'URL est sûr en le passant à sanitizer.bypassSecurityTrustResourceUrl()
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      },
      error => {
        console.error('Erreur lors du chargement de la vidéo :', error); // Afficher l'erreur dans la console
      }
    );
  }
  
  
  playVideo(): void {
    const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;
    if (videoPlayer) {
        videoPlayer.play();
    }
}

toggleFullScreen(): void {
  const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;
  if (videoPlayer) {
      if (videoPlayer.requestFullscreen) {
          videoPlayer.requestFullscreen();
      } else if (videoPlayer.requestFullscreen) { /* Chrome, Safari and Opera */
          videoPlayer.requestFullscreen();
      } else if (videoPlayer.requestFullscreen) { /* IE/Edge */
          videoPlayer.requestFullscreen();
      }
      this.isVideoVisible = true; // Ensure the video is visible when entering fullscreen
  }
}





}
