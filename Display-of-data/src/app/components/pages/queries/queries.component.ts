import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {cityNode} from "../../../models/cityNode";
import {DataGraphService} from "../../../service/data-graph.service";
import {ExampleFlatNode} from "../../../models/example-flat-node";
import {cityData} from "../../../models/cityData";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  nodeName!: string;
  colors = ['RED', 'GREEN', 'YELLOW', 'BLUE', 'PURPLE', 'BROWN'];
  DiagramTyp = ['PIECHART', 'BARCHART', 'LINECHART', 'DOUGHNUTCHART'];
  public form!: FormGroup;
  hideElementConfiguration = false;
  selectedLinesName!: string[];
  selectedLinesValue!: string[];
  showDatatoDisplay = false;
  data!: cityData[];
  errorMessage!: string;
  showTree = true;
  checkColumn = false;
  showButtonforTree = false;
  value!: string;
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

  constructor(private service: DataGraphService, private fb: FormBuilder) {

  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.getdata();
    this.form = this.fb.group({
      queryPath: [''],
      selectedLinesValue: this.fb.array([]),
      diagramType: ['', Validators.required],
      title: ['', Validators.required],
    });
    this.selectedLinesValue = new Array<string>();
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
  removeGroup(index: number) {
    const form = this.form.get('selectedLinesValue') as FormArray;
    form.removeAt(index);
  }
  addGroup(lineName: string) {
    const val = this.fb.group({
      lineName: [lineName],
      lineColor: ['', Validators.required]
    });
    const form = this.form.get('selectedLinesValue') as FormArray;
    form.push(val);

  }
  userTreeChoice(name: string) {
    this.nodeName = name;
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

  toggleEditableColumn(event: any, value: number, domainName: string) {
    this.value= domainName;
    if (event.target.checked) {
      this.selectedLinesValue.push(this.value);
      this.addGroup(domainName);
      this.selectedLinesValue.forEach(x => console.log(x))
      }
    else{
      this.selectedLinesValue.pop()
      const index = this.selectedLinesValue.indexOf(this.value)
      this.removeGroup(index);
      this.selectedLinesValue.forEach(x => console.log(x))
    }
  }

  trackById(index: any, item: any) {
    return index;
  }
}
