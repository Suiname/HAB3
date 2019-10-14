import React from "react";
import { Modal, ModalBody } from "shards-react";
import { BallBeat } from 'react-pure-loaders';


const LoadingModal = (props) => {
	const { open } = props;
	return (
		<Modal open={open} fade={false} backdrop={true} size={"xl"} centered={true}>
			<ModalBody>
				<div className='text-center'>
					Loading<BallBeat color={'#123abc'} loading={open}/>
				</div>
			</ModalBody>
		</Modal>
	)
}

export default LoadingModal;
