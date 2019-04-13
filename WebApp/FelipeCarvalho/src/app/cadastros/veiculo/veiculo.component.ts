import { Component, OnInit, ViewChild } from '@angular/core';
import { Veiculo } from '../../model/veiculo';
import { Cor } from '../../model/cor';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  displayedColumns: string[] = ['veiculoId', 'placa', 'renavam', 'chassi',
   'marca', 'modelo', 'ano', 'cor', 'editColumn'];

  public veiculoModel: Veiculo = new Veiculo();
  public veiculos: Array<Veiculo> = new Array<Veiculo>();
  public dataSource: any;
  public veiculoSelId: number;
  public veiculoRemover: Veiculo;
  public veiculoAtualizar: Veiculo;
  public veiculoSel: Veiculo = new Veiculo();
  public corSel: Cor = new Cor();
  public corSelId: number;
  public cor: Cor;
  public cores: Array<Cor>;

  @ViewChild(MatPaginator) paginatorCustom: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.populaCores();
    this.veiculoModel = new Veiculo();
  }

  salvarVeiculo() {
    this.veiculos.push(this.veiculoModel);
    console.log(this.veiculoModel.cor);
    this.veiculoModel = new Veiculo();
    this.atualizaTabela();
    console.log(this.veiculos);
  }

  removerVeiculo(veiculoRemover: Veiculo) {
    this.veiculos.splice(this.veiculos.indexOf(veiculoRemover), 1);
    this.atualizaTabela();
  }

  atualizaTabela() {
    this.dataSource = new MatTableDataSource<Veiculo>(this.veiculos);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sort;
  }

  limpar() {
    this.veiculoModel = new Veiculo();
  }

  aplicarFiltro(valor: string){
    valor = valor.trim();
    valor = valor.toLowerCase();

    console.log("realiza o filtro com "+valor);
    this.dataSource.filterPredicate = (data: Veiculo, filter: string ) => 
      data.veiculoId.toString().indexOf(filter) != -1 ||
      data.placa.toLowerCase().indexOf(filter) != -1 ||
      data.renavam.toString().indexOf(filter) != -1 ||
      data.chassi.toString().indexOf(filter) != -1 ||
      data.marca.toLowerCase().indexOf(filter) != -1 ||
      data.modelo.toLowerCase().indexOf(filter) != -1 ||
      data.ano.toString().indexOf(filter) != -1;
  
    this.dataSource.filter = valor;
  }

  atualizaListBox() {
    let id = this.corSelId;
    let corSel;
    this.cores.forEach(function (item) {
      if (item.corId == id) {
        corSel = item;
      }
    });
  }

  populaCores() {
    this.cores = new Array<Cor>();
    this.cor = new Cor();
    this.cor.corId = 1;
    this.cor.descricao = "Preto";
    this.cores.push(this.cor);
    
    this.cor = new Cor();
    this.cor.corId = 2;
    this.cor.descricao = "Branco";
    this.cores.push(this.cor);

    this.cor = new Cor();
    this.cor.corId = 2;
    this.cor.descricao = "Vermelho";
    this.cores.push(this.cor);
  }

  setFields(veiculoAtualizar: Veiculo) {
    this.veiculoAtualizar = veiculoAtualizar;
    this.veiculoAtualizar = new Veiculo();
    this.veiculoAtualizar = veiculoAtualizar;
  }



}
