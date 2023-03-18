import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {cityNode} from "../../../models/cityNode";
import {DataGraphService} from "../../../service/data-graph.service";
import {ExampleFlatNode} from "../../../models/example-flat-node";
import {cityData} from "../../../models/cityData";


@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  SelectedColumnName!: string[];
  SelectedColumnValue: number[] = [];
  showDatatoDisplay = false;
  data!: cityData[];
  errorMessage!: string;
  showTree = true;
  checkColumn = false;
  showButtonforTree = false;
  value!: number;
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

  getdata() {
    this.service.getAllData().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.errorMessage = 'Sorry, es war leider nicht möglich die daten zu laden.'
      },
      complete: () => {

      }
    })
  }

  userTreeChoice(name: string) {
    this.getCityData(name)
  }

  TreeShowControl() {
    this.showTree = !this.showTree;
    this.showButtonforTree = !this.showButtonforTree;
    this.showDatatoDisplay = !this.showDatatoDisplay;
  }

  getCityData(name: string) {
    console.log(name)
    this.service.getCityDatabyName(name).subscribe({
      next: (data) => {
        this.data = data.filter(element => element.name == name)
        console.log(this.data)
      },
      error: () => {
        console.log('big error')
      }
    })
  }

  toggleEditableColumn(event: any, value: number) {
    this.value= value;
    if (event.target.checked) {
      this.SelectedColumnValue.push(this.value);
      this.SelectedColumnValue.forEach(x => console.log(x))
      }
    else{
      this.SelectedColumnValue.pop()
      this.SelectedColumnValue.forEach(x => console.log(x))
    }


  }

}
