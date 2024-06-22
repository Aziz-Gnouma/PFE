import { Component, OnInit } from '@angular/core';
import { ChildService } from 'src/app/Services/child-service.service';
import { Child } from 'src/app/models/child';

@Component({
  selector: 'app-list-child',
  templateUrl: './list-child.component.html',
  styleUrls: ['./list-child.component.css']
})
export class ListChildComponent implements OnInit {
  children: Child[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  constructor(private childService: ChildService) { }

  ngOnInit(): void {
    this.getAllChildren();
  }

  getAllChildren(): void {
    this.childService.getAllChildren().subscribe(
      (children: Child[]) => {
        this.children = children;
      },
      (error) => {
        console.error('Error fetching children:', error);
      }
    );
  }
  getPaginatedItems(): Child[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.children.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const totalPages = Math.ceil(this.children.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getPaginationArray().length) {
      this.currentPage = page;
    }
  }
}
