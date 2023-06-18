cube(`Lineitem`, {
  sql: `SELECT * FROM tpch.lineitem`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {

  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [lShipdate, lCommitdate, lReceiptdate]
    },

    lLinenumber: {
      sql: `${CUBE}.\`L_LINENUMBER\``,
      type: `sum`
    },

    lQuantity: {
      sql: `${CUBE}.\`L_QUANTITY\``,
      type: `sum`,
       drillMembers: [lShipdate, lCommitdate, lReceiptdate]
    },

    lExtendedprice: {
      sql: `${CUBE}.\`L_EXTENDEDPRICE\``,
      type: `sum`
    },

    lDiscount: {
      sql: `${CUBE}.\`L_DISCOUNT\``,
      type: `sum`,
       drillMembers: [lShipdate, lCommitdate, lReceiptdate]
    }
  },

  dimensions: {
    lReturnflag: {
      sql: `${CUBE}.\`L_RETURNFLAG\``,
      type: `string`
    },

    lLinestatus: {
      sql: `${CUBE}.\`L_LINESTATUS\``,
      type: `string`
    },

    lShipinstruct: {
      sql: `${CUBE}.\`L_SHIPINSTRUCT\``,
      type: `string`
    },

    lShipmode: {
      sql: `${CUBE}.\`L_SHIPMODE\``,
      type: `string`
    },

    lComment: {
      sql: `${CUBE}.\`L_COMMENT\``,
      type: `string`
    },

    lShipdate: {
      sql: `${CUBE}.\`L_SHIPDATE\``,
      type: `time`
    },

    lCommitdate: {
      sql: `${CUBE}.\`L_COMMITDATE\``,
      type: `time`
    },

    lReceiptdate: {
      sql: `${CUBE}.\`L_RECEIPTDATE\``,
      type: `time`
    }
  },

  dataSource: `default`
});
