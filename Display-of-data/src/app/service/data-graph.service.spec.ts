import { TestBed } from '@angular/core/testing';

import { DataGraphService } from './data-graph.service';

describe('DataGraphService', () => {
  let service: DataGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
