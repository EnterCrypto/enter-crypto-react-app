import React, { Component } from 'react';
import styled from 'styled-components';
import Btn from './Button';
import TextField from '@material-ui/core/TextField';
import web3 from '../web3'
import QueenChain from '../DAppContracts/QueenChain'



class QueenChainActionMenu extends Component {

	constructor(props) {
		super(props);
	    this.state = {
		  tea: '',
		  newTea:'',
		  ethSpent: 0
		};
		this.updateInformation();
	}

  	spillTea(e) {
    	this.setState({newTea: e.target.value});
  	}

	async updateInformation() {
		QueenChain.getPastEvents('SpillTea', {
		fromBlock: 4000329,
		toBlock: 'latest'
		}, async (err, events) => {
			if (!err){
				console.log(events[events.length - 1])
				this.setState({tea: events[events.length - 1].returnValues._message, ethSpent: (events[events.length - 1].returnValues.ethEarned / 1000000000000000000)})
			} else {
				console.log(err);
			}
		});
	}

	render() {
		return(
			<div>
			<p> Spill the tea for 0.1 ETH! </p>
			<TextField onChange={this.spillTea.bind(this)} placeholder="The Tea..."/>
			<Btn> Spill it! </Btn>
			<p> Current spilt tea: {this.state.tea}</p>
			<p> ETH spent on QueenChain: {this.state.ethSpent} </p> 
			</div>);
	}
}
export default QueenChainActionMenu;
