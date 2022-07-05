import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Inventory, InventoryResponse } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly router: Router
  ) { }

  inventories: Inventory[] = []
  inventory: Inventory
  loading: boolean = true

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllInventory();
      this.loading = false
    }, 1000);
    
  }

  getAllInventory(): Inventory[] {
    try{
      const inventories: Inventory[] = []
      this.inventoryService.getAllData()
      .subscribe(
        {
          next: (response: ApiResponse<InventoryResponse<Inventory>>) => {
            for (let item of response.data.content){
              inventories.push(item)
            }
            this.inventories = inventories
          },
          error: (errorResponse: HttpErrorResponse) => {
            console.log("Ini ERORR ", errorResponse);
            
          }
        }
      )
      return inventories;
    } catch(error) {
      console.log(error);
      
    }
  }

  onDeletedInventory(id: string): void{
    try{

      this.inventoryService.getInventoryById(id)
      .subscribe(
        {
          next: (response: ApiResponse<Inventory>) => {
           this.inventory = response.data
          },
          error: (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            
          }
        }
      )

      if(confirm(`Apakah anda yakin akan menghapus inventory ini?`)){
        this.inventoryService.deleteInventory(id, this.inventory)
          .subscribe(
            {
              next: (response: ApiResponse<Inventory>) => {
                this.getAllInventory();
              },
              error: (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
                
              }
            }
            )
      }

    } catch(error) {
      console.log(error);
    }
  }

}
