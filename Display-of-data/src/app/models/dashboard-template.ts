export interface DashboardTemplate {
  DashboardTitle: string;
  DiagramTemplate:
    {
      id: number
      title: string
      diagramType: string
      queryPath: string
      selectedLinesValue: [
        {
          lineName: string,
          lineColor: string
        }
      ]
    }
}
