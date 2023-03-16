import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {cityNode} from "../../../models/cityNode";
import {DataGraphService} from "../../../service/data-graph.service";

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */




/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit{
  private transformer = (node: cityNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private service: DataGraphService) {

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.getdata();
  }

  getdata(){
    this.service.getAllData().subscribe({
      next:(data)=>{
        this.dataSource.data = data;
      },
      error:()=>{

      },
      complete:()=>{

      }
    })
  }
  has(){

  }
}
