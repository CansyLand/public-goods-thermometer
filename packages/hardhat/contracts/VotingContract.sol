//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingContract {
    struct Proposal {
        string description;
        address payable proposer;
        uint256 totalVotes;
    }

    Proposal[] public proposals;
    bool public isVotingActive;
    mapping(address => uint256) public voterBalances;
    mapping(uint256 => mapping(address => uint256)) public votesByProposal;


    // Modifier to check if voting is active
    modifier whenVotingActive() {
        require(isVotingActive, "Voting is not active.");
        _;
    }



    function createProposal(string memory description) public {
        proposals.push(Proposal({
            description: description,
            proposer: payable(msg.sender),
            totalVotes: 0
        }));
    }
    

    function startVoting() public {
        isVotingActive = true;
    }

    function vote(uint256 proposalId) public payable whenVotingActive {
        Proposal storage proposal = proposals[proposalId];
        proposal.totalVotes += msg.value;
        voterBalances[msg.sender] += msg.value;
        votesByProposal[proposalId][msg.sender] += msg.value;
    }

    function endVoting() public whenVotingActive {
        isVotingActive = false;
        sendFundsToWinner();
    }

    function sendFundsToWinner() public {
        // Ensure there are proposals to evaluate
        require(proposals.length > 0, "No proposals available.");

        uint256 winningVoteCount = 0;
        uint256 winningProposalIndex = 0;

        // Iterate through all proposals to find the one with the most votes
        for (uint256 i = 0; i < proposals.length; i++) {
            if (proposals[i].totalVotes > winningVoteCount) {
                winningVoteCount = proposals[i].totalVotes;
                winningProposalIndex = i;
            }
        }

        // Ensure there is a clear winner with votes
        require(winningVoteCount > 0, "No votes have been cast.");

        // Transfer the balance of the contract to the winning proposal's proposer
        Proposal storage winningProposal = proposals[winningProposalIndex];
        winningProposal.proposer.transfer(address(this).balance);
    }

    function getVoterShare(uint256 proposalId, address voter) public view returns (uint256) {
        uint256 totalVotesForProposal = proposals[proposalId].totalVotes;
        uint256 voterVotes = votesByProposal[proposalId][voter];

        // If there are no votes for the proposal, return 0 to avoid division by zero
        if (totalVotesForProposal == 0) {
            return 0;
        }

        // Calculate the voter's share as a percentage (multiplied by 100 for precision)
        uint256 voterShare = (voterVotes * 100) / totalVotesForProposal;
        return voterShare;
    }


}
