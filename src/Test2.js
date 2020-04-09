import React, { Component } from 'react';
import {
    TextField,
    Typography,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Divider,
    Grid,
    InputLabel,
    FormControl,
    Select,
    withStyles,
    MenuItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';


const styles = theme => ({
    root: {
        width: '91%',
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: "3%",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
    details: {
        alignItems: 'center',
        marginTop: "1%",
        marginBottom: "-2%",
    },
    secondaryHeading: {
        fontSize: "large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "gray",
    },
    dataHeading: {
        fontSize: "large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "black",
    },
    column1: {
        flexBasis: '33.33%',
        marginBottom: "-1%"
    },
    column2: {
        flexBasis: '50%',
    },
    column3: {
        flexBasis: '33.33%',
    },
    columnFull: {
        flexBasis: '100%',
    },
    openOrderLabel: {
        color: "white",
        background: "#3b3b3b"
    }, formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});
const FilterByOptions = [
    'category',
    'level',
    'medium',
    'programType'
];
const FilterByCategory = [
    'aws',
    'azure-ml',
    'unity',
    'javascript',
    'css',
    'wcf',
    '.net'
];
const FilterByLevel = [
    'Beginner',
    'Advanced',
    'Intermediate'
];
const FilterByMedium = [
    'online',
    'offline'
];
const FilterByProgramType = [
    'Online course',
    'Apprenticeship'
];

class Test1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted_data: [],
            active_index: -1,
            apiResponse: [],
            filterBy: null,
            filterByCategory: null,
            filterByLevel: null,
            filterByMedium: null,
            filterByProgramType: null
        }
    }
    async componentDidMount() {
        const obj = {}
        await axios.post('http://staging-api.quze.co/search/intern-test/_search', obj)
            .then((res) => {
                this.setState({ ...this.state, apiResponse: res.data.hits.hits })
            });
        document.title = 'Test_2';
        function sort_by_key(array, key) {
            return array.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
        await this.setState({ ...this.state, sorted_data: sort_by_key(this.state.apiResponse, '_id') });
    }
    handleExpChange = (index) => {
        this.setState({ ...this.state, active_index: this.state.active_index === index ? -1 : index })
    }
    filterData = (e) => {
        var x = -1;
        const updatedList = this.state.apiResponse.filter(item => {
            if (((item._source.title.toString().toLowerCase().search(e.target.value.toString().toLowerCase())) === 0)
                || ((item._source.courseId.toString().toLowerCase().search(e.target.value.toString().toLowerCase())) === 0)
            ) {
                x = 0;
            } else {
                x = -1;
                this.setState({ ...this.state, sorted_data: [] })
            }
            return (
                x !== -1
            );
        });
        this.setState({ ...this.state, sorted_data: updatedList });
    };
    filterDataBySelect = (val1, val2) => {
        var x = -1;
        const completeList = this.state.apiResponse;
        if (val2 === "") { this.setState({ ...this.state, sorted_data: completeList, filterByLevel: "", filterByCategory: "", filterByMedium: "", filterByProgramType: "" }); }
    };
    filterDataBySelectLevel = (val1, val2) => {
        var x = -1;
        const updatedList1 = this.state.apiResponse.filter(item => {
            {
                if ((item._source.level !== null)) {
                    if (((item._source.level.toString().toLowerCase().search(val2.toString().toLowerCase())) === 0)
                    ) {
                        x = 0;
                    } else {
                        x = -1;
                        this.setState({ ...this.state, sorted_data: [] })
                    }
                    return (
                        x !== -1
                    );
                }
            }
        });
        this.setState({ ...this.state, sorted_data: updatedList1, filterByLevel: "", filterByCategory: "", filterByMedium: "", filterByProgramType: "" })
    };
    filterDataBySelectCategory = (val1, val2) => {
        var x = -1;
        const updatedList1 = this.state.apiResponse.filter(item => {
            {
                if ((item._source.category !== null)) {
                    if (((item._source.category.toString().toLowerCase().search(val2.toString().toLowerCase())) === 0)
                    ) {
                        x = 0;
                    } else {
                        x = -1;
                        this.setState({ ...this.state, sorted_data: [] })
                    }
                    return (
                        x !== -1
                    );
                }
            }
        });
        this.setState({ ...this.state, sorted_data: updatedList1, filterByLevel: "", filterByCategory: "", filterByMedium: "", filterByProgramType: "" })
    };
    filterDataBySelectMedium = (val1, val2) => {
        var x = -1;
        const updatedList1 = this.state.apiResponse.filter(item => {
            {
                if ((item._source.medium !== null)) {
                    if (((item._source.medium.toString().toLowerCase().search(val2.toString().toLowerCase())) === 0)
                    ) {
                        x = 0;
                    } else {
                        x = -1;
                        this.setState({ ...this.state, sorted_data: [] })
                    }
                    return (
                        x !== -1
                    );
                }
            }
        });
        this.setState({ ...this.state, sorted_data: updatedList1, filterByLevel: "", filterByCategory: "", filterByMedium: "", filterByProgramType: "" })
    };
    filterDataBySelectProgramType = (val1, val2) => {
        var x = -1;
        const updatedList1 = this.state.apiResponse.filter(item => {
            {
                if ((item._source.programType !== null)) {
                    if (((item._source.programType.toString().toLowerCase().search(val2.toString().toLowerCase())) === 0)
                    ) {
                        x = 0;
                    } else {
                        x = -1;
                        this.setState({ ...this.state, sorted_data: [] })
                    }
                    return (
                        x !== -1
                    );
                }
            }
        });
        this.setState({ ...this.state, sorted_data: updatedList1, filterByLevel: "", filterByCategory: "", filterByMedium: "", filterByProgramType: "" })
    };

    handleChange = async (e) => {
        await this.setState({ ...this.state, filterBy: e.target.value })
        await this.filterDataBySelect(FilterByOptions[this.state.filterBy], "");
    }
    handleCategoryChange = async (e) => {
        await this.setState({ ...this.state, filterByCategory: e.target.value })
        await this.filterDataBySelectCategory(FilterByOptions[this.state.filterBy], FilterByCategory[this.state.filterByCategory]);
    }
    handleLevelChange = async (e) => {
        await this.setState({ ...this.state, filterByLevel: e.target.value })
        await this.filterDataBySelectLevel(FilterByOptions[this.state.filterBy], FilterByLevel[this.state.filterByLevel]);
    }
    handleMediumChange = async (e) => {
        await this.setState({ ...this.state, filterByMedium: e.target.value })
        await this.filterDataBySelectMedium(FilterByOptions[this.state.filterBy], FilterByMedium[this.state.filterByMedium]);
    }
    handleProgramTypeChange = async (e) => {
        await this.setState({ ...this.state, filterByProgramType: e.target.value })
        await this.filterDataBySelectProgramType(FilterByOptions[this.state.filterBy], FilterByProgramType[this.state.filterByProgramType]);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <Typography className={classes.main_heading}><b>Task-2: Retrieving Data from Elasticsearch API Endpoint</b></Typography>
                {this.state.sorted_data &&
                    <TextField
                        id="search"
                        label="Search...."
                        placeholder="Course ID, Title "
                        style={{ "width": "98%" }}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={(value) => this.filterData(value)}
                    />
                }

                <Grid container spacing={3} style={{ "textAlign": "left", "marginLeft": "2%" }}>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">FILTER BY</InputLabel>
                            <Select
                                value={this.state.filterBy}
                                onChange={(value) => this.handleChange(value)}
                            >
                                <MenuItem value={0}>Category</MenuItem>
                                <MenuItem value={1}>Level</MenuItem>
                                <MenuItem value={2}>Medium</MenuItem>
                                <MenuItem value={3}>Program Type</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {this.state.filterBy === 0 &&
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">SELECT</InputLabel>
                                <Select
                                    value={this.state.categorySelect}
                                    onChange={(value) => this.handleCategoryChange(value)}
                                >
                                    <MenuItem value={0}>aws</MenuItem>
                                    <MenuItem value={1}>azure-ml</MenuItem>
                                    <MenuItem value={2}>unity</MenuItem>
                                    <MenuItem value={3}>javascript</MenuItem>
                                    <MenuItem value={4}>css</MenuItem>
                                    <MenuItem value={5}>wcf</MenuItem>
                                    <MenuItem value={6}>.net</MenuItem>
                                </Select>
                            </FormControl>
                        }
                        {this.state.filterBy === 1 &&
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">SELECT</InputLabel>
                                <Select
                                    value={this.state.categorySelect}
                                    onChange={(value) => this.handleLevelChange(value)}
                                >
                                    <MenuItem value={0}>Beginner</MenuItem>
                                    <MenuItem value={1}>Advanced</MenuItem>
                                    <MenuItem value={2}>Intermediate</MenuItem>
                                </Select>
                            </FormControl>
                        }
                        {this.state.filterBy === 2 &&
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">SELECT</InputLabel>
                                <Select
                                    value={this.state.categorySelect}
                                    onChange={(value) => this.handleMediumChange(value)}
                                >
                                    <MenuItem value={0}>online</MenuItem>
                                    <MenuItem value={1}>offline</MenuItem>
                                </Select>
                            </FormControl>
                        }
                        {this.state.filterBy === 3 &&
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">SELECT</InputLabel>
                                <Select
                                    value={this.state.categorySelect}
                                    onChange={(value) => this.handleProgramTypeChange(value)}
                                >
                                    <MenuItem value={0}>Online course</MenuItem>
                                    <MenuItem value={1}>Apprenticeship</MenuItem>
                                </Select>
                            </FormControl>
                        }
                    </Grid>
                </Grid>
                <br />

                {this.state.sorted_data &&
                    this.state.sorted_data.length > 0 &&
                    this.state.sorted_data.map((listValue, index) => {
                        return (
                            <ExpansionPanel expanded={this.state.active_index === index}
                                onChange={() => this.handleExpChange(index)}
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id={index}
                                    style={{ "background": "lightgrey" }}
                                >
                                    <div className={classes.column1}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.secondaryHeading}>Course ID : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.courseId && listValue._source.courseId !== "") ? listValue._source.courseId : "N/A"} </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.column1}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.secondaryHeading}>Title : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.title && listValue._source.title !== "") ? listValue._source.title : "N/A"} </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ExpansionPanelSummary>
                                <Divider />
                                <ExpansionPanelDetails className={classes.details}>
                                    <div className={classes.column2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.secondaryHeading}>Author : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.author && listValue._source.author !== "") ? listValue._source.author : "N/A"}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.column2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.secondaryHeading}>Provider : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.provider && listValue._source.provider !== "") ? listValue._source.provider : "N/A"}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div className={classes.column2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.secondaryHeading}>level : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.level && listValue._source.level !== "") ? listValue._source.level : "N/A"}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.column2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.secondaryHeading}>Program Type : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.programType && listValue._source.programType !== "") ? listValue._source.programType : "N/A"}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div className={classes.column2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.secondaryHeading}>category : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.category && listValue._source.category !== "") ? listValue._source.category : "N/A"}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.column2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.secondaryHeading}>Quze Category : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.quzeCategory && listValue._source.quzeCategory !== "") ? listValue._source.quzeCategory : "N/A"}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div className={classes.column2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.secondaryHeading}>Meduim : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.medium && listValue._source.medium !== "") ? listValue._source.medium : "N/A"}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.column2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.secondaryHeading}>Language : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.language && listValue._source.language !== "") ? listValue._source.language : "N/A"}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div className={classes.columnFull}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.secondaryHeading}>Short Description : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography className={classes.dataHeading}>{(listValue._source.shortDescription && listValue._source.shortDescription !== "") ? listValue._source.shortDescription : "N/A"}</Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ExpansionPanelDetails>
                                <br />
                            </ExpansionPanel>
                        );
                    })}
            </div >
        )
    }
}
export default withStyles(styles)(Test1);