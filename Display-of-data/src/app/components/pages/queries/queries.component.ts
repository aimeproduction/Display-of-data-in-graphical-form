import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {HttpClient} from '@angular/common/http';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';


/**
 * @interface QueryData
 * QueryData is an interface based on the structure of the answer(Json file) that the server send after a GET request
 * in order to get all the stored queries. It allows us to access the different elements contained in the Json file.
 * @param id the id of the query
 * @param path the path of the query
 * @param name the name of the query
 * @param type the type of the query
 * @param open true or false
 * @param data contains the sub-folders of a query
 */
export interface QueryData {
  id: string;
  path: string;
  name: string;
  type: string;
  open: boolean;
  data: QueryData[];
}


/**
 * @interface Response
 * Response is an interface based on the structure of the answer(Json file) that the server send after a POST request
 * in order to get all informations about a specify query. It allows us to access to access the arrays columnConfigs and ResulData.
 * @param columnConfig contains all informations(like the id) about the header of the query.
 * @param ResultData contains all informations(like the values) about the body of the query.
 */

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent {

}
